#!/usr/bin/env node
// Keeps the code smell record: what /sdd-code-smell assessed, so that a run
// knows what it need not assess again. Changes no file but the record, and the
// temporary file it is written through.
//
//   node smell.mjs snapshot [--rescan]             print "<hash>  <path>" of each file to assess
//   node smell.mjs leave <path> <why>              note a file left out, with why
//   node smell.mjs record <path> <hash> [-]        write a file's result, with -, its findings as JSON on stdin
//
// The spec folder is read from .sdd/settings.json ("specFolder"), from the
// repository's root; "specs" when there is none. Exit 0, or 2 on a request
// that cannot be met, the record left as it was.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

const [command, ...args] = process.argv.slice(2);
let specFolder;
let recordFile;

// The real path of the nearest folder that exists, and what is not made yet below it.
function whereItLeads(path) {
  return existsSync(path) ? realpathSync(path) : join(whereItLeads(dirname(path)), basename(path));
}

function readSettings() {
  const settingsFile = join(".sdd", "settings.json");
  let settings = {};
  if (existsSync(settingsFile)) {
    try {
      settings = JSON.parse(readFileSync(settingsFile, "utf8"));
    } catch (error) {
      throw new Error(`${settingsFile} cannot be read: ${error.message}`);
    }
  }
  specFolder = settings?.specFolder ?? "specs";
  if (typeof specFolder !== "string") throw new Error(`${settingsFile} cannot be read: specFolder is not a path`);
  const isOutside = (path) => path === ".." || path.startsWith(`..${sep}`) || isAbsolute(path);
  const outside = new Error(`${settingsFile} cannot be read: specFolder ${specFolder} is outside the repository`);
  // Judged by where it leads, a link included; kept relative, as git lists the record.
  const inside = relative(realpathSync(process.cwd()), whereItLeads(resolve(specFolder)));
  if (isOutside(inside)) throw outside;
  specFolder = inside || ".";
  recordFile = join(specFolder, "code-smell.json");
}

function refuse(reason) {
  console.error(reason);
  process.exitCode = 2;
}

function readRecord() {
  if (!existsSync(recordFile)) return { leftOut: Object.create(null), files: Object.create(null) };
  let record;
  try {
    record = JSON.parse(readFileSync(recordFile, "utf8"));
  } catch (error) {
    throw new Error(`${recordFile} cannot be read: ${error.message}`);
  }
  const isEntries = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  if (!isEntries(record) || !isEntries(record.leftOut) || !isEntries(record.files)) throw new Error(`${recordFile} cannot be read: it is no code smell record`);
  // No prototype, for a file named `constructor` or `__proto__` is a file like any other.
  return { leftOut: Object.assign(Object.create(null), record.leftOut), files: Object.assign(Object.create(null), record.files) };
}

// Written whole and renamed, so that a run stopped here leaves the record whole.
function writeRecord(record) {
  mkdirSync(specFolder, { recursive: true });
  const sorted = (entries) => Object.fromEntries(Object.entries(entries).sort(([a], [b]) => (a < b ? -1 : 1)));
  const text = `${JSON.stringify({ leftOut: sorted(record.leftOut), files: sorted(record.files) }, null, 2)}\n`;
  // Never through what stands at that path: the repository may hold a link there.
  rmSync(`${recordFile}.tmp`, { force: true });
  writeFileSync(`${recordFile}.tmp`, text, { flag: "wx" });
  renameSync(`${recordFile}.tmp`, recordFile);
}

// What stands at a path, or nothing where it is gone, a folder of its included.
function statOf(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return undefined;
    throw error;
  }
}

// What git tracks or would add, and the names no line of the snapshot can hold,
// each with why. A file deleted but still tracked is gone.
function repositoryFiles() {
  const listed = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { maxBuffer: 1 << 28 });
  const names = new Set();
  const unlisted = new Map();
  for (let start = 0, end; (end = listed.indexOf(0, start)) !== -1; start = end + 1) {
    const name = listed.subarray(start, end);
    const text = name.toString();
    const why = !Buffer.from(text).equals(name) ? "a name that is not UTF-8, cannot be read" : text.includes("\n") ? "a name that holds a line break, cannot be listed" : null;
    if (why === null) names.add(text);
    else if (statOf(Buffer.from(name))) unlisted.set(text, why);
  }
  return { files: [...names].filter((path) => statOf(path)).sort(), unlisted };
}

// Written as the snapshot writes it, so that the next snapshot finds its entry.
const isListed = (path) => repositoryFiles().files.includes(path);

const hashOf = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

function snapshot(flags) {
  if (flags.some((flag) => flag !== "--rescan")) return refuse("usage: node smell.mjs snapshot [--rescan]");
  const rescan = flags.includes("--rescan");
  const record = readRecord();
  const recordPath = recordFile.split("\\").join("/");
  // A run killed mid-write leaves its temporary file, which is not the repository's.
  const listed = repositoryFiles();
  const files = listed.files.filter((path) => path !== `${recordPath}.tmp`);
  const present = new Set([...files, ...listed.unlisted.keys()]);
  for (const path of Object.keys(record.files)) if (!present.has(path)) delete record.files[path];
  for (const path of Object.keys(record.leftOut)) if (!present.has(path)) delete record.leftOut[path];
  record.leftOut[recordPath] = { why: "the code smell record itself" };
  for (const path of files) {
    if (lstatSync(path).isFile()) continue;
    delete record.files[path];
    record.leftOut[path] = { why: "a link or a submodule, no text to assess" };
  }
  for (const [path, why] of listed.unlisted) {
    delete record.files[path];
    record.leftOut[path] = { why };
  }
  const lines = [];
  for (const path of files) {
    if (path === recordPath || !lstatSync(path).isFile()) continue;
    const hash = hashOf(path);
    const left = record.leftOut[path];
    if (left ? left.hash !== hash : rescan || record.files[path]?.hash !== hash) lines.push(`${hash}  ${path}`);
  }
  writeRecord(record);
  if (lines.length > 0) process.stdout.write(`${lines.join("\n")}\n`);
  console.error(`${lines.length} to assess, ${Object.keys(record.files).length} in the record, ${Object.keys(record.leftOut).length} left out`);
}

function leave([path, why]) {
  if (!path || !why) return refuse("usage: node smell.mjs leave <path> <why>");
  if (!isListed(path)) return refuse(`${path} is no file of the snapshot`);
  const record = readRecord();
  delete record.files[path];
  record.leftOut[path] = { why, hash: hashOf(path) };
  writeRecord(record);
}

function parseFindings(json) {
  let findings;
  try {
    findings = JSON.parse(json);
  } catch {
    return null;
  }
  const isFinding = (item) => typeof item?.rule === "string" && item.rule !== "" && Number.isInteger(item.line) && item.line > 0 && typeof item.says === "string" && item.says !== "";
  return Array.isArray(findings) && findings.every(isFinding) ? findings : null;
}

function recordResult([path, hash, source]) {
  if (!path || !/^[0-9a-f]{64}$/.test(hash ?? "") || ![undefined, "-"].includes(source)) return refuse("usage: node smell.mjs record <path> <hash> [-]");
  const findings = parseFindings(source === "-" ? readFileSync(0, "utf8") : "[]");
  if (findings === null) return refuse('findings must be a JSON list of { "rule", "line", "says" }');
  if (!isListed(path)) return refuse(`${path} is no file of the snapshot`);
  const record = readRecord();
  delete record.leftOut[path];
  record.files[path] = { hash, assessed: new Date().toISOString().slice(0, 10), good: findings.length === 0, findings };
  writeRecord(record);
}

const commands = { snapshot, leave, record: recordResult };
if (!Object.hasOwn(commands, command ?? "")) refuse("usage: node smell.mjs snapshot|leave|record");
else {
  try {
    readSettings();
    commands[command](args);
  } catch (error) {
    refuse(error.message);
  }
}
