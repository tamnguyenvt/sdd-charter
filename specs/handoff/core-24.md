# CORE Story 24 — handoff

**Updated**: 2026-11-03

## Done

- Branch `task/core-24-code-smell` opened from `004-code-smell`; story set `In Progress`.
- Baseline passed 2026-11-02: `node --test` 58 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` of `sdd-specs` passes.
- Spec gate passed 2026-11-02.
- Built: skill `sdd-code-smell`, script `sdd-smell` with 29 tests, the record in the spec format guide and the README.
- Verify 2026-11-02: tests 87 pass twice; `cw test` 6 cases; `cw doctor`, `check`, clean check pass; real agent runs on Sonnet in scratch repositories below.
- Scenario 1: dropped `commit-message-tone` and three more rules, each with why. Scenario 4: a new charter, 0 files assessed, no `--rescan`. Scenario 5: asked in so many words, `--rescan` passed, 6 files assessed. Scenario 6: killed after 2 files recorded, a new run assessed only the other 4, one `record` call each.
- Hostile names: files named with `$(touch pwned)`, a backtick and a `'` recorded through single quotes, no command ran.
- Scenario 7: an agent asked in plain words about the coding rules did not start the walk, and the record was unchanged.
- `record` and `leave` refuse a path the snapshot does not list (seventh review); a spec folder written absolute or linked outside is held to the repository (eighth review); a tracked file whose folder became a file is dropped as gone (ninth review).

## Remaining

- None: the user approved on 2026-11-03; the story is `Done`.
- Left as they are, approved by the user without a change: `leave` hashes the file when it runs; `assessed` is the UTC date; `record` and `leave` take the record's own path; `isListed` lists the repository on every call; no refusal to run from a subfolder.

## Decisions

- 2026-11-03, at the first hand-over: files git ignores are not left-out files (CORE-FR-051 and a clarification say so); a stopped rescan does not resume with only the others (an edge case says so); the skill opens by stopping unless the developer started it; all eight nits of the sixth review fixed.
- The user's new idea — a per-user language asked once and kept in `.sdd/settings.local.json`, ignored by `.sdd/.gitignore`, loaded on every run — is beyond this story: it goes to /sdd-plan once this story lands.
- The user moved the quality cross-check, CORE Story 23, behind CORE Story 26 in `plan.json`, amended into the phase commit of `004-code-smell`.
- Skill `sdd-code-smell` with `disable-model-invocation: true`; a Node script `sdd-smell` with tests for the snapshot, the hashes and the record; the record at `<spec folder>/code-smell.json`, committed, one write per assessed file. The review gate, skipping and planning stay for CORE Story 25.

## Blockers

- none
