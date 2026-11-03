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

## Story-local decisions moved from ADR.md

Moved verbatim by CORE Story 28; retained here as implementation history.

## ADR-001: Persist only completed code assessments

**Decision**: Taking a snapshot never writes persistent state. The code smell
record holds only assessed files and their review decisions. Exclusions are
recomputed and explained on each run, never saved.

**Why**: A snapshot can be repeated; only completed assessments need to survive
between runs.

**Consequences**: All later consumers of the record must work without saved
exclusions. Legacy exclusions are ignored on reads and removed on the next
explicit write. Entries for files no longer present are removed on an
explicit update, not by a snapshot.

Source: [CORE Story 24](spec-core.md#core-story-24---find-the-code-smells-of-a-repository-priority-p2), [CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054), reversed by the developer
while implementing [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) on 2026-11-03.

## ADR-002: Rename the assessment listing command and bypass history on repeats

**Decision**: The listing command is `scan`, replacing `snapshot`; its full
repeat flag is `--again`, replacing `--rescan`. A full repeat does not read
previous assessments, including an unreadable record. Successful listings
print only hashes and file paths. Existing repository eligibility exclusions
still apply.

**Why**: The developer requested clearer names and an explicit way to list
all assessable files independently of the old record.

**Consequences**: All callers use the new command and flag. The old names
are rejected. Normal scans still compare current hashes against assessments;
listing files never records an assessment or alters review decisions.

Source: [CORE Story 24](spec-core.md#core-story-24---find-the-code-smells-of-a-repository-priority-p2), [CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054), revised while implementing
[CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) on 2026-11-03. This extends ADR-001.
