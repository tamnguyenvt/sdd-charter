# Quality

The checklist /sdd-quality checks against, item by item. Add, change or drop
items as this project needs; each must be one a pass can find passing or
failing.

## Code against the stories

- Every scenario of a `Done` story is held by a test that would fail without
  it, or by the run its evidence in `plan.json` names.
- Every test and static check the project defines passes, twice in a row,
  none skipped.
- The code of each `Done` story does what its FR say, and no later change
  bent an FR it cites.
- No code does what no FR asks for, and nothing an out of scope excludes is
  built.
- The code keeps the guides that apply to it.

## Specs against each other

- **Consistent** — a term means one thing in every spec, and one thing has
  one term.
- **Complete** — every FR is cited by a story, every scenario cites an FR or
  SC and can be tested, every edge case is answered by an FR, every SC has a
  number to measure.
- **No conflict** — no two FR, stories, clarifications, assumptions or out
  of scope lines contradict each other, in one spec or across specs.
- **Roadmap** — every dependency in `plan.json` is borne out by the stories,
  and `check` passes.
- **Format** — every spec keeps the spec format of the charter's
  `sdd-spec-format` guide.

<!-- Add the checks this project needs, under either heading or one of your
own: one line each, something a pass can find passing or failing — "Every
endpoint checks the caller's role", "No query is built by string
concatenation". The quality pass writes its report under `## Last pass` below
this comment; leave that section to it. -->

## Last pass

**Date**: 2026-11-06, by [CORE Story 32](spec-core.md#core-story-32---quality-cross-check-of-core-stories-2731-priority-p3)

Run: `node --test .cw/charter/script/*/*.test.mjs` twice: 124 pass, 0 fail, 0 skipped each time; the generated suite `.cw/out/script/*/*.test.mjs` twice: 124 pass, 0 fail, 0 skipped each time; `cw test` 6 cases passed; `cw doctor` nothing to fix, one warning (no test case names `changelog-only-when-asked`); `check` and `doctor` of `sdd-specs` pass; `git diff --check` passes. The cases put to the real agent, `cw eval --agent claude`: 21 cases, 20 passed, 1 failed ([CORE-FR-047](spec-core.md#core-fr-047)).

The violation of the pass before, [CORE Story 27](spec-core.md#core-story-27---talk-to-each-developer-in-the-language-they-chose-and-write-the-documents-in-the-repositorys-priority-p2) scenario 11 and the first half of its scenario 10, is now held by the runs its evidence names, and is not reported again.

### Code against the stories

- Every scenario of a `Done` story is held: pass — every `Done` story, CORE Stories 1–31, names in its evidence in `specs/plan.json` the tests or the runs that hold its scenarios; CORE Stories 27–31, landed since the pass before, name each scenario's test or run in their handoff notes too.
- Every test and static check passes twice, none skipped: pass — warnings: `cw doctor` says no test case names the guide `changelog-only-when-asked`, so nothing notices when it stops coming up where it should. The case of `.cw/eval/voice.json` that holds a developer who chose a language to it while writing in another failed on "No successful read evidence for .sdd/settings.local.json". The case asks the agent to write that file itself, so the agent knows its content without reading it again. It answered in Vietnamese, the language chosen, so [CORE-SC-009](spec-core.md#core-sc-009) holds. What is done with the result is the eval's own (Out of Scope); [CORE-FR-047](spec-core.md#core-fr-047), [CORE-FR-049](spec-core.md#core-fr-049), [CORE-FR-063](spec-core.md#core-fr-063).
- The code of each `Done` story does what its FR say: pass
- No code does what no FR asks for: pass — warning, as before: no FR describes the skill `sdd-release` (`.claude/skills/sdd-release/SKILL.md`). It is this repository's own tooling and the charter does not export it, so [CORE-FR-028](spec-core.md#core-fr-028) does not reach it.
- The code keeps the guides that apply to it: pass

### Specs against each other

- **Consistent**: pass — warnings: as before, the spec calls the developer's request to assess every file again "a rescan" ([CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054)). /sdd-code-smell and `sdd-smell` still call it "a repeat scan" (`.cw/charter/skill/sdd-code-smell/index.md:21`, `:51`; `.cw/charter/script/sdd-smell/index.md:36`, `:191`). [CORE Story 28](spec-core.md#core-story-28---fix-what-the-second-quality-pass-found-priority-p2) scenario 6 made the term one throughout the spec alone. New in this pass: [CORE-FR-070](spec-core.md#core-fr-070) and [CORE-FR-071](spec-core.md#core-fr-071) describe the roadmap report, yet they sit under the **Code smell** group of the Functional Requirements, not under **Roadmap**.
- **Complete**: pass — warning, as before: no scenario cites [CORE-SC-007](spec-core.md#core-sc-007) or [CORE-SC-008](spec-core.md#core-sc-008).
- **No conflict**: pass
- **Roadmap**: pass
- **Format**: pass

**Grade**: B — no violation, six warnings.
