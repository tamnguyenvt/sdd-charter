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

**Date**: 2026-10-27, [CORE Story 9](spec-core.md#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3)

Run: `node --test` of `sdd-specs` and `sdd-clean`, twice: 52 pass, 0 fail, 0 skipped each time; `cw test` 5 cases passed; `cw doctor` nothing to fix; `check` and `doctor` of `sdd-specs` pass.

### Code against the stories

- Every scenario of a `Done` story is held: **fail**
  - [CORE Story 4](spec-core.md#core-story-4---refuse-to-finish-on-an-unclean-state-priority-p2) has no evidence in `plan.json` (`specs/plan.json:9`), so only tests can hold it, and none holds scenario 1 or the "nothing lands" of scenario 2 — /sdd-finish running the checks before landing (`.cw/charter/skill/sdd-finish/index.md:18-28`) — nor scenario 3: the one twice-run test is on a state with findings, and the clean state is run once (`.cw/charter/script/sdd-clean/clean.test.mjs:166-176`, `:46-52`); [CORE-FR-010](spec-core.md#core-fr-010), [CORE-SC-002](spec-core.md#core-sc-002).
  - [CORE Story 7](spec-core.md#core-story-7---check-the-product-against-its-stories-over-time-priority-p3) scenario 2 — the report in place of the pass before, the checklist unchanged — is named by no evidence (`specs/plan.json:14`) and no test; [CORE-FR-015](spec-core.md#core-fr-015) (proven in [CORE Story 9](spec-core.md#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) since; its evidence names it).
  - [CORE Story 10](spec-core.md#core-story-10---review-with-the-proof-verify-produced-priority-p2) scenario 3, its first half — a scenario the verify line proves counted proven — is named by no evidence (`specs/plan.json:18`, the failing half only) and no test; [CORE-FR-022](spec-core.md#core-fr-022).
- Every test and static check passes twice, none skipped: pass
- The code of each `Done` story does what its FR say: **fail**
  - /sdd-bug-fix hands a fix over "in one line: it is fixed and needs the user's review" (`.cw/charter/playbook/sdd-bug-fix/index.md:67-68`): a line saying the change is done and waiting, which `sdd-change-rules` now forbids, and it names no known failure (`.cw/charter/mixin/sdd-change-rules/index.md:15-19`); [CORE Story 2](spec-core.md#core-story-2---check-the-baseline-before-the-first-change-priority-p1) scenario 3, [CORE-FR-004](spec-core.md#core-fr-004).
  - `sdd-clean` writes its findings and exits at once (`.cw/charter/script/sdd-clean/clean.mjs:120-121`); on a macOS pipe stdout is cut at 128 KB, so a long list is not named in full, as `doctor` already guards against (`.cw/charter/script/sdd-specs/specs.mjs:22-25`); [CORE-FR-010](spec-core.md#core-fr-010).
- No code does what no FR asks for: **fail**
  - Phase 1 is built but described by no story or FR (`specs/spec-core.md:19-21`): `link`, `ready` and `report` (`.cw/charter/script/sdd-specs/specs.mjs:233-293`, `:299-417`), the sensor `sdd-specs-on-stop`, /sdd-plan (`.cw/charter/playbook/sdd-plan/index.md:10-48`, `:59-72`), /sdd-implement's pick, spec gate and test first (`.cw/charter/playbook/sdd-implement/index.md:21-49`), /sdd-finish's landing (`.cw/charter/skill/sdd-finish/index.md:36-67`), /sdd-bug-fix but its baseline, /sdd-status, /sdd-report, /sdd-analyze, /sdd-cleanup, /sdd-learn, `sdd-locator`, the guide `sdd-learnings-go-to-the-inbox`, the templates `sdd-spec`, `sdd-spec-index`, `sdd-manifest`.
  - The checklist template holds the code to the guides (`.cw/charter/template/sdd-quality-doc/index.md:23`), where the out of scope says the pass checks the code only against the stories (`specs/spec-core.md:432`); [CORE-FR-014](spec-core.md#core-fr-014).
- The code keeps the guides that apply to it: pass

### Specs against each other

- **Consistent**: **fail**
  - "health" names the setup health check ([CORE-FR-017](spec-core.md#core-fr-017)) and the quality grade: "the health of each part is graded on a regular beat" (`specs/spec-core.md:27-28`).
- **Complete**: **fail**
  - No FR answers the edge cases of a session finding no handoff note where notes are ignored (`specs/spec-core.md:338`), or of a spec with no `Done` story, whose code is not checked (`specs/spec-core.md:342`).
- **No conflict**: **fail**
  - The Overview grades each part and sends the next session where to clean first (`specs/spec-core.md:27-28`), against one overall grade and `CORE-FR-016` dropped ([CORE-FR-014](spec-core.md#core-fr-014); clarifications, `specs/spec-core.md:52`, `:55`).
  - A cross-check after every five stories, fixed: [CORE Story 7](spec-core.md#core-story-7---check-the-product-against-its-stories-over-time-priority-p3) (`specs/spec-core.md:208-209`), [CORE-SC-005](spec-core.md#core-sc-005) and the assumption on short phases (`specs/spec-core.md:419`, `:426`), against [CORE-FR-019](spec-core.md#core-fr-019), which takes the manifest's number where it names one.
- **Roadmap**: pass
- **Format**: pass — `spec.md` lacks the `quality.md` line `sdd-spec-index` now gives (warning).

**Grade**: F — Done scenarios nothing proves.
