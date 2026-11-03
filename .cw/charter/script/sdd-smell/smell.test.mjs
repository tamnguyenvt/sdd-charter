// The record of `smell`, run against a repository made for each case.
//
//   node --test .cw/out/script/sdd-smell/smell.test.mjs
import { execFileSync, execSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import assert from "node:assert/strict";

const smellScript = join(dirname(fileURLToPath(import.meta.url)), "smell.mjs");
const finding = { rule: "no-magic-number", line: 3, says: "42 has no name" };
let repositoryFolder;

const hashOf = (text) => createHash("sha256").update(text).digest("hex");
const git = (...args) => execFileSync("git", args, { cwd: repositoryFolder, encoding: "utf8" });
function write(path, text) {
  mkdirSync(dirname(join(repositoryFolder, path)), { recursive: true });
  writeFileSync(join(repositoryFolder, path), text);
}

function repositoryOf(files) {
  repositoryFolder = mkdtempSync(join(tmpdir(), "sdd-smell-"));
  git("init", "-q", "-b", "main");
  write(".sdd/settings.json", '{ "specFolder": "docs" }\n');
  for (const [path, text] of Object.entries(files)) write(path, text);
}

function smell(...args) {
  return smellWith("", ...args);
}

function smellWith(input, ...args) {
  const run = spawnSync("node", [smellScript, ...args], { cwd: repositoryFolder, encoding: "utf8", input });
  return { status: run.status, output: run.stdout + run.stderr, stdout: run.stdout };
}

const recordFile = () => join(repositoryFolder, "docs", "code-smell.json");
const record = () => JSON.parse(readFileSync(recordFile(), "utf8"));
const toAssess = () => smell("snapshot").stdout.split("\n").filter(Boolean).map((line) => line.split("  ")[1]);

afterEach(() => rmSync(repositoryFolder, { recursive: true, force: true }));

test("the snapshot prints each file with its hash, and what git ignores is not in it", () => {
  repositoryOf({ "a.mjs": "one\n", "b/c.mjs": "two\n", ".gitignore": "built/\n", "built/x.mjs": "three\n" });
  const { status, stdout } = smell("snapshot");
  assert.equal(status, 0);
  assert.match(stdout, new RegExp(`^${hashOf("one\n")}  a\\.mjs$`, "m"));
  assert.match(stdout, new RegExp(`^${hashOf("two\n")}  b/c\\.mjs$`, "m"));
  assert.doesNotMatch(stdout, /built/);
});

test("a file left out is noted with why, and leaves the snapshot", () => {
  repositoryOf({ "a.mjs": "one\n", "vendor.min.js": "two\n" });
  assert.equal(smell("leave", "vendor.min.js", "minified, not written here").status, 0);
  assert.deepEqual(record().leftOut, { "vendor.min.js": { why: "minified, not written here", hash: hashOf("two\n") } });
  assert.ok(!toAssess().includes("vendor.min.js"));
});

test("the record itself is noted as left out, never assessed", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("record", "a.mjs", hashOf("one\n"));
  assert.deepEqual(toAssess(), [".sdd/settings.json"]);
  assert.match(record().leftOut["docs/code-smell.json"].why, /record/);
});

test("a file assessed holds its hash, its date, whether it is good and each finding", () => {
  repositoryOf({ "good.mjs": "one\n", "bad.mjs": "two\n" });
  assert.equal(smell("record", "good.mjs", hashOf("one\n")).status, 0);
  assert.equal(smellWith(JSON.stringify([finding]), "record", "bad.mjs", hashOf("two\n"), "-").status, 0);
  const { files } = record();
  const today = new Date().toISOString().slice(0, 10);
  assert.deepEqual(files["good.mjs"], { hash: hashOf("one\n"), assessed: today, good: true, findings: [] });
  assert.deepEqual(files["bad.mjs"], { hash: hashOf("two\n"), assessed: today, good: false, findings: [finding] });
});

test("nothing outside the record is changed", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("snapshot");
  smell("record", "a.mjs", hashOf("one\n"));
  smell("leave", ".sdd/settings.json", "not code");
  assert.equal(readFileSync(join(repositoryFolder, "a.mjs"), "utf8"), "one\n");
  assert.equal(existsSync(`${recordFile()}.tmp`), false);
});

test("an unchanged file is not assessed again; a new or changed one is", () => {
  repositoryOf({ "a.mjs": "one\n", "b.mjs": "two\n" });
  smell("leave", ".sdd/settings.json", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  smell("record", "b.mjs", hashOf("two\n"));
  assert.deepEqual(toAssess(), []);
  write("b.mjs", "changed\n");
  write("c.mjs", "new\n");
  assert.deepEqual(toAssess(), ["b.mjs", "c.mjs"]);
});

test("a file changed after the snapshot keeps the hash assessed, so it comes back", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("record", "a.mjs", hashOf("one\n"));
  write("a.mjs", "changed\n");
  assert.ok(toAssess().includes("a.mjs"));
  assert.equal(record().files["a.mjs"].hash, hashOf("one\n"));
});

test("a rescan asked for brings unchanged files back, their entries kept until assessed", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("leave", ".sdd/settings.json", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  const { stdout } = smell("snapshot", "--rescan");
  assert.match(stdout, /a\.mjs/);
  assert.doesNotMatch(stdout, /settings/);
  assert.ok(record().files["a.mjs"]);
});

test("a deleted entry is assessed again", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("leave", ".sdd/settings.json", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  const edited = record();
  delete edited.files["a.mjs"];
  writeFileSync(recordFile(), JSON.stringify(edited));
  assert.deepEqual(toAssess(), ["a.mjs"]);
});

test("a run stopped halfway keeps what it assessed and gives only the others", () => {
  repositoryOf({ "a.mjs": "one\n", "b.mjs": "two\n", "c.mjs": "three\n" });
  smell("leave", ".sdd/settings.json", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  assert.deepEqual(toAssess(), ["b.mjs", "c.mjs"]);
  assert.ok(record().files["a.mjs"]);
});

test("the entry of a file that is gone is dropped", () => {
  repositoryOf({ "a.mjs": "one\n", "b.mjs": "two\n" });
  smell("record", "a.mjs", hashOf("one\n"));
  smell("leave", "b.mjs", "generated");
  rmSync(join(repositoryFolder, "a.mjs"));
  rmSync(join(repositoryFolder, "b.mjs"));
  smell("snapshot");
  assert.equal(record().files["a.mjs"], undefined);
  assert.equal(record().leftOut["b.mjs"], undefined);
});

test("a file whose folder became a file is gone, and its entry dropped", () => {
  repositoryOf({ "a/b.mjs": "one\n" });
  git("add", "-A");
  smell("record", "a/b.mjs", hashOf("one\n"));
  rmSync(join(repositoryFolder, "a"), { recursive: true });
  write("a", "now a file\n");
  assert.equal(smell("snapshot").status, 0);
  assert.equal(record().files["a/b.mjs"], undefined);
});

test("assessing a file left out takes it off that list, and leaving one out drops its entry", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("leave", "a.mjs", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  assert.equal(record().leftOut["a.mjs"], undefined);
  smell("leave", "a.mjs", "not code");
  assert.equal(record().files["a.mjs"], undefined);
});

test("the file a run killed mid-write left behind is not assessed, and the record stays good", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("record", "a.mjs", hashOf("one\n"));
  write("docs/code-smell.json.tmp", "{ half");
  const { status, stdout } = smell("snapshot");
  assert.equal(status, 0);
  assert.doesNotMatch(stdout, /\.tmp/);
  assert.ok(record().files["a.mjs"]);
});

test("a link planted where the record is written changes nothing it points to", () => {
  repositoryOf({ "a.mjs": "one\n" });
  mkdirSync(join(repositoryFolder, "docs"));
  symlinkSync("../a.mjs", `${recordFile()}.tmp`);
  assert.equal(smell("snapshot").status, 0);
  assert.equal(readFileSync(join(repositoryFolder, "a.mjs"), "utf8"), "one\n");
  assert.equal(lstatSync(recordFile()).isFile(), true);
});

test("a record that cannot be read stops the run and is left as it was", () => {
  repositoryOf({ "a.mjs": "one\n" });
  write("docs/code-smell.json", "{ broken");
  for (const args of [["snapshot"], ["record", "a.mjs", hashOf("one\n")], ["leave", "a.mjs", "why"]]) {
    const { status, output } = smell(...args);
    assert.equal(status, 2);
    assert.match(output, /code-smell\.json/);
  }
  assert.equal(readFileSync(recordFile(), "utf8"), "{ broken");
});

test("a finding holding a quote or a shell word is kept as it was written", () => {
  repositoryOf({ "a.mjs": "one\n" });
  const says = "doesn't name it; $(touch pwned) `id`";
  const input = JSON.stringify([{ ...finding, says }]);
  assert.equal(smellWith(input, "record", "a.mjs", hashOf("one\n"), "-").status, 0);
  assert.equal(record().files["a.mjs"].findings[0].says, says);
  assert.equal(existsSync(join(repositoryFolder, "pwned")), false);
});

test("a file left out comes back when it changes, and not before", () => {
  repositoryOf({ "a.mjs": "one\n" });
  smell("leave", ".sdd/settings.json", "not code");
  smell("leave", "a.mjs", "generated");
  assert.deepEqual(toAssess(), []);
  write("a.mjs", "changed\n");
  assert.deepEqual(toAssess(), ["a.mjs"]);
});

test("a link is noted as left out with why, and is not assessed", () => {
  repositoryOf({ "a.mjs": "one\n" });
  symlinkSync("missing.mjs", join(repositoryFolder, "link.mjs"));
  assert.ok(!toAssess().includes("link.mjs"));
  assert.match(record().leftOut["link.mjs"].why, /link/);
});

test("a name that is not UTF-8, gone from the working tree, is dropped like any file gone", () => {
  repositoryOf({ "a.mjs": "one\n" });
  execSync(`git update-index --add --cacheinfo 100644,$(git hash-object -w a.mjs),$(printf 'bad\\377.mjs')`, { cwd: repositoryFolder, shell: "/bin/sh" });
  assert.equal(smell("snapshot").status, 0);
  assert.equal(Object.values(record().leftOut).filter(({ why }) => /UTF-8/.test(why)).length, 0);
});

test("a name holding a line break is noted as left out with why, and leaves the snapshot", () => {
  repositoryOf({ "a.mjs": "one\n", "two\nlines.mjs": "two\n" });
  assert.ok(!smell("snapshot").stdout.includes("two"));
  assert.match(record().leftOut["two\nlines.mjs"].why, /line break/);
  rmSync(join(repositoryFolder, "two\nlines.mjs"));
  smell("snapshot");
  assert.equal(record().leftOut["two\nlines.mjs"], undefined);
});

test("files named as what every object inherits are files like any other", () => {
  const names = ["constructor", "toString", "__proto__"];
  repositoryOf(Object.fromEntries(names.map((name) => [name, "one\n"])));
  smell("leave", ".sdd/settings.json", "not code");
  for (const name of names) assert.ok(toAssess().includes(name), name);
  for (const name of names) assert.equal(smell("record", name, hashOf("one\n")).status, 0);
  assert.deepEqual(toAssess(), []);
  assert.equal(Object.keys(record().files).length, 3);
});

test("a file that cannot be read stops the snapshot with the record left as it was", () => {
  repositoryOf({ "a.mjs": "one\n", "gone.mjs": "two\n" });
  smell("record", "gone.mjs", hashOf("two\n"));
  const before = readFileSync(recordFile(), "utf8");
  rmSync(join(repositoryFolder, "gone.mjs"));
  chmodSync(join(repositoryFolder, "a.mjs"), 0o000);
  const { status } = smell("snapshot");
  chmodSync(join(repositoryFolder, "a.mjs"), 0o644);
  assert.equal(status, 2);
  assert.equal(readFileSync(recordFile(), "utf8"), before);
});

test("a spec folder outside the repository is refused", () => {
  repositoryOf({ "a.mjs": "one\n" });
  for (const folder of ["..", "../elsewhere", "/tmp"]) {
    write(".sdd/settings.json", JSON.stringify({ specFolder: folder }));
    const { status, output } = smell("snapshot");
    assert.equal(status, 2, folder);
    assert.match(output, /outside the repository/);
  }
});

test("a spec folder written as an absolute path inside the repository keeps the record out of the snapshot", () => {
  repositoryOf({ "a.mjs": "one\n" });
  write(".sdd/settings.json", JSON.stringify({ specFolder: join(repositoryFolder, "docs") }));
  smell("leave", ".sdd/settings.json", "not code");
  smell("record", "a.mjs", hashOf("one\n"));
  assert.deepEqual(toAssess(), []);
  assert.ok(record().leftOut["docs/code-smell.json"]);
});

test("a spec folder that is a link to a folder outside is refused, and nothing is written there", () => {
  repositoryOf({ "a.mjs": "one\n" });
  const elsewhere = mkdtempSync(join(tmpdir(), "sdd-smell-elsewhere-"));
  symlinkSync(elsewhere, join(repositoryFolder, "docs"));
  const { status, output } = smell("snapshot");
  assert.equal(status, 2);
  assert.match(output, /outside the repository/);
  assert.deepEqual(readdirSync(elsewhere), []);
  rmSync(elsewhere, { recursive: true });
});

test("a broken settings file stops the run with exit 2", () => {
  repositoryOf({ "a.mjs": "one\n" });
  for (const text of ["{ broken", '{ "specFolder": 5 }']) {
    write(".sdd/settings.json", text);
    const { status, output } = smell("snapshot");
    assert.equal(status, 2, text);
    assert.match(output, /settings\.json cannot be read/);
  }
});

test("a record of the wrong shape stops the run and is left as it was", () => {
  repositoryOf({ "a.mjs": "one\n" });
  for (const text of ["[]", "5", "null", '{ "file": {} }', '{ "leftOut": {}, "files": [] }']) {
    write("docs/code-smell.json", text);
    assert.equal(smell("snapshot").status, 2, text);
    assert.equal(readFileSync(recordFile(), "utf8"), text);
  }
});

test("a result that is not one is refused, and nothing is written", () => {
  repositoryOf({ "a.mjs": "one\n" });
  for (const args of [
    ["record", "a.mjs", "nothash"],
    ["record", "a.mjs", hashOf("one\n"), JSON.stringify([finding])],
    ["leave", "a.mjs"],
    ["leave", "gone.mjs", "why"],
    ["record", "gone.mjs", hashOf("one\n")],
    ["record", "./a.mjs", hashOf("one\n")],
    ["leave", "./a.mjs", "why"],
    ["leave", "../outside.mjs", "why"],
    ["snapshot", "--resan"],
    ["unknown"],
  ]) assert.equal(smell(...args).status, 2, args.join(" "));
  for (const input of ["not json", JSON.stringify([{ rule: "r" }]), JSON.stringify([{ ...finding, line: 0 }])]) {
    assert.equal(smellWith(input, "record", "a.mjs", hashOf("one\n"), "-").status, 2, input);
  }
  assert.equal(existsSync(recordFile()), false);
});
