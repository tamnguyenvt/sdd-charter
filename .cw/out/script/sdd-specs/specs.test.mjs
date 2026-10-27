// The handoff note rules of `check`, run against spec folders made for each case.
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

// A spec set of two stories, with the statuses given, the notes given, and a
// manifest saying how handoff notes are kept where one is given.
function specSetOf({ statuses, notes = [], handoffNotes }) {
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
    JSON.stringify({ stories: statuses.map((_, index) => ({ id: `CORE Story ${index + 1}`, title: `Story ${index + 1}`, dependsOn: [] })) }),
  );
  for (const [name, text] of notes) writeFileSync(join(repositoryFolder, "specs", "handoff", name), text);
  if (handoffNotes) writeFileSync(join(repositoryFolder, "specs", "manifest.md"), `# Manifest\n\n## Committing\n\n- **Handoff notes**: ${handoffNotes}\n`);
}

function check() {
  const run = spawnSync("node", [specsScript, "check"], { cwd: repositoryFolder, encoding: "utf8" });
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
