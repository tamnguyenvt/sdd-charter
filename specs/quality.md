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

**Date**: 2026-11-03, [CORE Story 23](spec-core.md#core-story-23---quality-cross-check-of-core-stories-11-and-1922-priority-p3)

Run: `node --test` of `sdd-specs`, `sdd-clean` and `sdd-smell`, twice: 105 pass, 0 fail, 0 skipped each time; `cw test` 6 cases passed; `cw doctor` nothing to fix; `check` and `doctor` of `sdd-specs` pass; `cw eval --agent claude`: 20 cases, 20 passed, 0 failed.

### Code against the stories

- Every scenario of a `Done` story is held: **fail**
  - [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) scenario 1, its "nothing planned before the yes", and scenario 4 are held by no test, and its evidence (`specs/plan.json:49`) names no run of them — "workflows pass"; the runs that hold them are recorded in its handoff note alone (`specs/handoff/core-25.md:16`, `:27`); [CORE-FR-011](spec-core.md#core-fr-011), [CORE-FR-056](spec-core.md#core-fr-056), [CORE-FR-059](spec-core.md#core-fr-059).
- Every test and static check passes twice, none skipped: pass
- The code of each `Done` story does what its FR say: **fail**
  - /sdd-plan (`.cw/charter/playbook/sdd-plan/index.md:48-52`) does not place a phase's stories after a quality cross-check not yet `Done`, as [CORE-FR-019](spec-core.md#core-fr-019) now requires, so phase 4 put CORE Stories 24–26 before [CORE Story 23](spec-core.md#core-story-23---quality-cross-check-of-core-stories-11-and-1922-priority-p3) (`specs/plan.json:47-51`) and eight stories — CORE Stories 11, 19–22 and 24–26 — landed without a quality pass between them, against [CORE-SC-005](spec-core.md#core-sc-005).
  - The "Never in a spec" of the `sdd-spec-format` guide (`.cw/charter/guide/sdd-spec-format/index.md:102-105`), the iron law of /sdd-plan that a file name in a spec is a defect (`.cw/charter/playbook/sdd-plan/index.md:67-68`), and the error /sdd-analyze reports for implementation in the spec (`.cw/charter/skill/sdd-analyze/index.md:25-26`) hold no exception for what [CORE-FR-030](spec-core.md#core-fr-030) allows since 2026-11-03: what a spec writes from the developer's own review of the code; [CORE Story 12](spec-core.md#core-story-12---set-a-repository-up-for-spec-driven-development-priority-p1), [CORE-FR-030](spec-core.md#core-fr-030).
- No code does what no FR asks for: pass
- The code keeps the guides that apply to it: pass

### Specs against each other

- **Consistent**: **fail**
  - The developer's request to assess every file again is called "an explicitly requested full scan" in [CORE-FR-051](spec-core.md#core-fr-051) (`specs/spec-core.md:997`) and an edge case (`:860`), and "a rescan" in [CORE-FR-054](spec-core.md#core-fr-054), [CORE Story 24](spec-core.md#core-story-24---find-the-code-smells-of-a-repository-priority-p2) scenario 5, two clarifications, an edge case, an assumption and the out of scope (`:118`, `:138`, `:737`, `:873`, `:1039`, `:1047`).
- **Complete**: pass — warning: [CORE-SC-007](spec-core.md#core-sc-007) and [CORE-SC-008](spec-core.md#core-sc-008) are cited by no scenario.
- **No conflict**: **fail**
  - [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2)'s Independent Test skips "one rule's" findings at the gate (`specs/spec-core.md:754`), against its scenario 2 and [CORE-FR-057](spec-core.md#core-fr-057), which skip exactly one finding by its id.
- **Roadmap**: pass
- **Format**: **fail** — the clarification naming the code smell script's commands and flag (`specs/spec-core.md:133`) and what [CORE-FR-051](spec-core.md#core-fr-051) says a listing prints come from the developer's own review of the code, which [CORE-FR-030](spec-core.md#core-fr-030) allows, so they are not counted here. The missing exception is reported once, under the code item above. One violation remains:
  - `ADR.md` holds ADR-001 to ADR-004 (`specs/ADR.md:3`, `:20`, `:38`, `:53`), decisions CORE Stories 24 and 25 alone need, which the `sdd-spec-format` guide keeps in the code and this repository's rule keeps out of `ADR.md` ([CORE-FR-030](spec-core.md#core-fr-030)).

**Grade**: F — a `Done` scenario nothing proves: [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) scenarios 1 and 4; six violations.
