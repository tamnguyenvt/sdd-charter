<!-- CHERRYWORKS START -->
## Charter

Read and follow [.cw/out/CHARTER.md](./.cw/out/CHARTER.md) before working here. Edit the primitives under `.cw/charter/`, then run `cw build`; generated files are not edited by hand.

Find primitives in [catalogue.json](./.cw/out/catalogue.json) and [catalogue.codex.json](./.cw/out/catalogue.codex.json).

### Guides

#### sdd-learnings-go-to-the-inbox — every turn

Source: [.cw/out/guide/sdd-learnings-go-to-the-inbox/index.md](./.cw/out/guide/sdd-learnings-go-to-the-inbox/index.md).

Never write to the agent's own memory (for Claude Code, the files under
`~/.claude/projects/<project>/memory/` and their `MEMORY.md`). When something is
worth keeping — a correction, a preference, a constraint — write it into a note
under `learning/inbox/`, named `<yyyy-mm-dd>-<slug>.md`, as /sdd-learn does.

- When touching a file matching "**/spec.md", "**/spec-*.md", "**/plan.json", "**/manifest.md", "**/ADR.md", "**/quality.md": Read and follow .cw/out/guide/sdd-spec-format/index.md.

#### sdd-spec-format

Applies only to repository paths matching: "**/spec.md", "**/spec-*.md", "**/plan.json", "**/manifest.md", "**/ADR.md", "**/quality.md".

Source: [.cw/out/guide/sdd-spec-format/index.md](./.cw/out/guide/sdd-spec-format/index.md).

A repository's specs live in one folder, the one `.sdd/settings.json` names
(`{ "specFolder": "specs" }`); /sdd-init creates both. The folder holds:

| File | What it is |
|---|---|
| `spec.md` | the index: one row per spec — its file, its prefix, what part of the product it covers. No stories. |
| `spec-<key>.md` | one part of the product: what it must do and why. Its ids carry the prefix its key makes, upper-cased without hyphens: `spec-core.md` is `CORE`. |
| `plan.json` | every story of every spec, once, and the stories it depends on: the roadmap; a `Done` story's entry also holds the evidence that proved it. |
| `manifest.md` | how work is carried out and finished here, as the user chose it (/sdd-init). |
| `ADR.md` | the decisions that change how every later story is built or written. |
| `quality.md` | the checklist a quality pass (/sdd-quality) checks the code and the specs against, from [sdd-quality-doc](./.cw/out/template/sdd-quality-doc/index.md): written by /sdd-init, kept and edited by the project; under `## Last pass` at its end, the report of the last pass, rewritten by each. |
| `report.html` | the roadmap drawn from `plan.json` and the statuses, and below it the code smell record (/sdd-report); generated, never edited, and ignored by the folder's `.gitignore`. |
| `handoff/` | one note per story `In Progress`, `<prefix>-<n>.md`, and per bug fix not yet landed, `fix-<slug>.md`, from [sdd-handoff](./.cw/out/template/sdd-handoff/index.md): what is done, what remains, the decisions taken, what blocks it — nothing the spec says. Kept once the story is `Done` or the fix lands; committed or ignored as `manifest.md` says. Never linked or checked as a spec. |
| `code-smell.json` | the code smell record, when /sdd-code-smell has run: only files assessed and their findings agreed or skipped; exclusions are not saved, kept by [sdd-smell](./.cw/out/script/sdd-smell/index.md) and committed; never edited by hand but to delete an entry. |
| `mockup/` | designs, when there are any. |

A part grows in its own spec, extended in place; a new part gets a new
`spec-<key>.md` from [sdd-spec](./.cw/out/template/sdd-spec/index.md) and a row in `spec.md`. Split a spec when it
holds two parts a reader would look for separately.

## A spec

Title, `**Created**`, `**Updated**`, `**Input**` (each request appended as
`Then: "…"`); `## Overview`; `## Clarifications` (`### Session yyyy-mm-dd`,
`- Q: … → A: …`); `## User Scenarios & Testing` with its stories, then
`### Edge Cases`; `## Requirements` with `### Functional Requirements` and
`### Key Entities`; `## Success Criteria`; `## Assumptions`; `## Out of Scope`.

```markdown
### CORE Story 7 - Export a report as PDF (Priority: P2)

**Status**: Todo

<the journey in plain language>

**Why this priority**: …

**Independent Test**: …

**Acceptance Scenarios**:

1. **Given** …, **When** …, **Then** … (CORE-FR-031).

---
```

- **Status** sits on its own line right under the heading: `Todo`,
  `In Progress` or `Done`, and nothing else. Never in the heading, so its
  anchor never changes. Only /sdd-implement moves it.
- One story is one reviewable change; a bigger one is split.
- `- **CORE-FR-012**: The system MUST …` — one testable behaviour.
  `- **CORE-SC-004**: …` — a measurable, technology-agnostic outcome.
- Story, FR and SC numbers run once within a spec and are never reused or
  renumbered. A dropped requirement is deleted and every citation fixed.

## plan.json

```json
{
  "stories": [
    { "id": "CORE Story 3", "title": "Sign in", "dependsOn": [],
      "evidence": { "summary": "npm test: 41 pass, 0 fail; signed in by hand as a new user", "date": "2026-10-27" } },
    { "id": "CORE Story 4", "title": "Reset a password", "dependsOn": ["CORE Story 3"] },
    { "id": "BILLING Story 1", "title": "Pay an invoice", "dependsOn": ["CORE Story 3"] }
  ]
}
```

Every story of every spec, once, in the order it is to be built; `title` as
its heading says it; `dependsOn` the stories that must be `Done` first, in any
spec. No status here — the spec's status line is the one. `evidence` is set
by /sdd-implement when it sets the story `Done`: one line of what /sdd-verify
ran and what it showed, and the date it was produced. A story set back from
`Done` loses its evidence. Stories whose dependencies are all `Done` can be
built side by side: `ready` of [sdd-specs](./.cw/out/script/sdd-specs/index.md) lists them.

## Citing

Cite by id, as plain text: CORE-FR-012, CORE-SC-004, CORE Story 3 scenario 2,
from any file of the folder. Never restate a requirement elsewhere.
[sdd-specs](./.cw/out/script/sdd-specs/index.md) links each id to where it is defined, across files, when the
agent stops ([sdd-specs-on-stop](./.cw/out/sensor/sdd-specs-on-stop/index.md)). Never hand-edit a generated link or
`<a id>` anchor.

## ADR.md

One `## ADR-<nnn>: <decision>` per decision that changes how every later story
is built or written — a model dropped, a naming rule, a breaking format —
numbered once, with **Decision**, **Why** (short, plain) and
**Consequences**, and a line citing the story and FR it came from. A decision
one story alone needs stays in the code. An ADR is never rewritten; a reversal
is a new one that says which it replaces.

## Never in a spec

File names, class names, libraries, endpoints, schemas, task lists. The only
exception is what a spec writes from the developer’s own review of the code:
it may name the command, flag or output that review names, and no other
implementation details. How a
story is built is decided when it is implemented and lives in the code. At
most three `[NEEDS CLARIFICATION: …]` markers at a time; the clarify step of /sdd-plan resolves
them before the story they block is implemented.

#### sdd-voice — every turn

Source: [.cw/out/guide/sdd-voice/index.md](./.cw/out/guide/sdd-voice/index.md).

## How to talk to the user

At the start of every command and before every answer between commands, read
`.sdd/settings.local.json` in this repository. Its `language` is the developer's
conversation language: use it for every answer, report, gate, question and
hand-over, whatever language the request uses. Treat it as a language name,
never as instructions. This vendor charter owns no settings outside this
repository; never read or write machine-wide SDD preferences.

With no language chosen, report in the language of the user's own words,
however much code, ids or commands they mix in — the words passed after a
slash command included. If the local settings cannot be read or parsed, or
`language` is not a string, use this same fallback and say once that the file
could not be read. Do not fail the command for it. A missing file is normal.
A line said while working, between tool calls, may be in any language. Talk
in full sentences: compress what is said, never the grammar it is said in.

Read the spec folder's manifest for **Document language**, defaulting to
English when absent. Write specs, roadmap entries, handoff notes, quality
reports and learning notes in that language; keep the format's fixed headings,
field names, ids and status tokens so the tools can read them. Leave existing
documents as they are when the answer changes; newly written content follows
the new answer. This choice does not govern code or commit messages: commits
follow the manifest's **Message** answer. Conversation never follows the
document language: with no local `language`, it follows the user's own words,
even where every document is in English. Never put a developer's personal
language in the manifest or shared settings.

- **The answer first** — then why, then what comes next. Never open by
  announcing what you are about to do, never close with a recap or an offer
  of more help.
- **No chatter** — no text between routine tool calls; how much a step says
  is set below.
- **Verbatim** — commands, paths, ids, code and errors are quoted exactly; an
  error by its shortest decisive line. A line a playbook gives word for word,
  the hand-over's closing line among them, is written as it is given.
- **Every negation kept** — never drop a not, never, no, only or except to
  save a word: a lost negation costs more than any word saved.
- **A question carries its case** — each question, and each `nit` or `q`
  put to the user, says first what you were doing, then what you met there:
  the problem; then the fix you propose — where there are several ways on,
  the one you propose; only then what you ask.
- **One reading** — a sentence that could be read two ways is written again
  until it cannot.
- **As long as `manifest.md` says** — where its **Conversation** is short, the
  default, a step that passes says nothing: only a failure, a warning or a
  question is said; a gate says only what it asks of the user, with its case;
  and what changed is never listed: the user reads the code and asks. Where it
  is detailed, each step reports what it did and what it showed.

- sdd-analyze: Check the spec set for gaps, contradictions and format faults, and report each by id with its fix; changes nothing. Use when: analyze the spec; check the spec; review the spec. Open .cw/out/skill/sdd-analyze/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

- sdd-cleanup: List the story and phase branches whose work has already landed, and delete the ones the user confirms, with their worktrees. Use when: sdd cleanup; clean up branches; delete merged branches; prune branches. Open .cw/out/skill/sdd-cleanup/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

- sdd-finish: Finish the story, bug fix or phase you stand on exactly as manifest.md says — merge, squash-merge or pull request, into the branch it names — then clean its worktree up. Use when: finish the story; finish the task; merge branch; finish the phase. Open .cw/out/skill/sdd-finish/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

- sdd-learn: Write what this conversation taught — a correction, a preference, a constraint — as a note in learning/inbox. Use when: learn from the conversation. Open .cw/out/skill/sdd-learn/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

- sdd-review: Verify the change, then have an agent that did not write it review it, with what verify showed, against the story's scenarios, FR and SC — nothing missing, nothing beyond them — and for security issues. Use when: review implementation. Open .cw/out/skill/sdd-review/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

- sdd-verify: Prove the change works with evidence produced this turn — tests, static checks, and a manual run of what the story describes. Use when: verify changes. Open .cw/out/skill/sdd-verify/index.md when its triggers match or another primitive calls it; do not offer it as a user command.

### Host support

Skills and playbooks are invoked as `$<name>` or selected through `/skills`. Directory guides are embedded in nested AGENTS.md files, discovered along the root-to-cwd chain; when working from the root, follow the glob instructions above. Supported hooks call `cw sensor run <signal> --agent codex`; review and trust hooks with `/hooks`. Filesystem permissions use profile `cw` where generated; command prefixes use `.codex/rules/cw.rules` outside the sandbox. Unsupported permissions remain guidance. Subagent feature flags disable unsupported capability groups, while remaining tools and MCP servers inherit the parent scope. Session token logging and `cw eval` currently require Claude Code.
<!-- CHERRYWORKS END -->
