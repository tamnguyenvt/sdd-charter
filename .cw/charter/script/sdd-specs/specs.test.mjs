// The handoff note and evidence rules of `check`, run against spec folders made for each case.
//
//   node --test .cw/out/script/sdd-specs/specs.test.mjs
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import assert from "node:assert/strict";

const specsScript = join(dirname(fileURLToPath(import.meta.url)), "specs.mjs");
let repositoryFolder;

// A spec set of two stories, with the statuses given, the notes given, the
// evidence given on each story's roadmap entry, and a manifest saying how
// handoff notes are kept where one is given.
function specSetOf({ statuses, notes = [], handoffNotes, evidence = [] }) {
  repositoryFolder = mkdtempSync(join(tmpdir(), "sdd-specs-"));
  mkdirSync(join(repositoryFolder, ".sdd"));
  mkdirSync(join(repositoryFolder, "specs", "handoff"), { recursive: true });
  writeFileSync(join(repositoryFolder, ".sdd", "settings.json"), '{ "specFolder": "specs" }');
  writeFileSync(
    join(repositoryFolder, "specs", "spec-core.md"),
    statuses.map((status, index) => `### CORE Story ${index + 1} - Story ${index + 1} (Priority: P1)\n\n**Status**: ${status}\n\nText.\n`).join("\n"),
  );
  writeFileSync(
    join(repositoryFolder, "specs", "plan.json"),
    JSON.stringify({
      stories: statuses.map((_, index) => ({ id: `CORE Story ${index + 1}`, title: `Story ${index + 1}`, dependsOn: [], ...(evidence[index] && { evidence: evidence[index] }) })),
    }),
  );
  for (const [name, text] of notes) writeFileSync(join(repositoryFolder, "specs", "handoff", name), text);
  if (handoffNotes) writeFileSync(join(repositoryFolder, "specs", "manifest.md"), `# Manifest\n\n## Committing\n\n- **Handoff notes**: ${handoffNotes}\n`);
}

function check(...flags) {
  const run = spawnSync("node", [specsScript, "check", ...flags], { cwd: repositoryFolder, encoding: "utf8" });
  return { status: run.status, output: run.stdout + run.stderr };
}

afterEach(() => rmSync(repositoryFolder, { recursive: true, force: true }));

test("a story In Progress with no note fails, naming the note", () => {
  specSetOf({ statuses: ["In Progress", "Todo"] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /specs\/handoff\/core-1\.md: missing/);
});

test("a story In Progress with its note passes", () => {
  specSetOf({ statuses: ["In Progress", "Todo"], notes: [["core-1.md", "## Done\n"]] });
  assert.equal(check().status, 0);
});

test("a note for a Done story fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], notes: [["core-1.md", "## Done\n"]] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /specs\/handoff\/core-1\.md: a handoff note for CORE Story 1, which is Done/);
});

test("a note for a Todo story fails", () => {
  specSetOf({ statuses: ["Todo", "Todo"], notes: [["core-2.md", "## Done\n"]] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /core-2\.md: a handoff note for CORE Story 2, which is Todo/);
});

test("a note for no story fails", () => {
  specSetOf({ statuses: ["Todo", "Todo"], notes: [["core-9.md", "## Done\n"]] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /specs\/handoff\/core-9\.md: a handoff note for no story/);
});

test("a note is not read as a spec: what it cites is not checked", () => {
  specSetOf({ statuses: ["In Progress", "Todo"], notes: [["core-1.md", "Waits on CORE Story 7.\n"]] });
  assert.equal(check().status, 0);
});

test("where notes are ignored, a story In Progress with no note passes", () => {
  specSetOf({ statuses: ["In Progress", "Todo"], handoffNotes: "ignored — `handoff/` is in the spec folder's `.gitignore`" });
  assert.equal(check().status, 0);
});

test("where notes are ignored, a note for a Done story still fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], notes: [["core-1.md", "## Done\n"]], handoffNotes: "ignored" });
  assert.equal(check().status, 1);
});

test("where notes are committed, a story In Progress with no note fails", () => {
  specSetOf({ statuses: ["In Progress", "Todo"], handoffNotes: "committed — a story's handoff note is committed with its work" });
  assert.equal(check().status, 1);
});

const proof = { summary: "node --test: 30 pass, 0 fail; check of sdd-specs passed", date: "2026-10-27" };

test("evidence on a Done story's roadmap entry passes", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [proof] });
  assert.equal(check().status, 0);
});

test("a Done story with no evidence passes", () => {
  specSetOf({ statuses: ["Done", "Todo"] });
  assert.equal(check().status, 0);
});

test("evidence for a story In Progress fails", () => {
  specSetOf({ statuses: ["In Progress", "Todo"], notes: [["core-1.md", "## Done\n"]], evidence: [proof] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /specs\/plan\.json: "CORE Story 1" has evidence, but is In Progress; remove it/);
});

test("evidence for a Todo story fails", () => {
  specSetOf({ statuses: ["Todo", "Todo"], evidence: [, proof] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /"CORE Story 2" has evidence, but is Todo; remove it/);
});

test("evidence with no date fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [{ summary: proof.summary }] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /"CORE Story 1" has evidence that is not \{ "summary": "<one line>", "date": "yyyy-mm-dd" \}/);
});

test("evidence of more than one line fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [{ ...proof, summary: "tests pass\rand more" }] });
  const { status, output } = check();
  assert.equal(status, 1);
  assert.match(output, /"CORE Story 1" has evidence that is not/);
});

test("evidence with an empty summary fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [{ summary: "", date: proof.date }] });
  assert.match(check().output, /"CORE Story 1" has evidence that is not/);
});

test("evidence with a date that is no day fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [{ ...proof, date: "2026-13-45" }] });
  assert.match(check().output, /"CORE Story 1" has evidence that is not/);
});

test("a story landing Done with no evidence fails, though plain check passes", () => {
  specSetOf({ statuses: ["Done", "Todo"] });
  assert.equal(check().status, 0);
  const { status, output } = check("--landing", "CORE Story 1");
  assert.equal(status, 1);
  assert.match(output, /specs\/plan\.json: "CORE Story 1" lands with no evidence; write what proved it and the date/);
});

test("a story landing Done with its evidence passes", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [proof] });
  assert.equal(check("--landing", "CORE Story 1").status, 0);
});

test("landing a story that is not in plan.json fails", () => {
  specSetOf({ statuses: ["Done", "Todo"], evidence: [proof] });
  assert.match(check("--landing", "CORE Story 7").output, /"CORE Story 7" lands, but is no story in plan\.json/);
});
