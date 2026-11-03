# CORE Story 23 — handoff

**Updated**: 2026-11-03

## Done

- Branch `task/core-23-quality-cross-check` opened from `004-code-smell`; story set `In Progress`.
- Baseline passed 2026-11-03: `node --test .cw/charter/script/*/*.test.mjs` 105 pass, 0 fail (plain `node --test` finds none, `.cw` is hidden); `cw test` 6 cases; `cw doctor` nothing to fix; `check` exit 0.
- Spec gate passed 2026-11-03.
- Quality pass run 2026-11-03, report under `## Last pass` of `quality.md`: grade F, six violations in five items. Tests twice 105 pass, 0 fail; `cw eval --agent claude` 20 cases, 20 passed, 0 failed (log kept outside the repository).
- CORE Story 28 written from the violations, CORE-FR-019 amended; its first version, of four violations, accepted by the user 2026-11-03; it now holds six, to be accepted again.
- Verify 2026-11-03: 105 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` exit 0.
- First review failed on a `bug`: the report had replaced the end of the checklist's comment and its `## Last pass` heading; restored. Verify again: 105 pass, 0 fail; `cw test` 6 cases; `check` exit 0. Second review failed on three `risk`: two violations the report missed (the term for assessing every file again; CORE Story 25 scenarios 1 and 4 not named by its evidence) and three stale line citations; the report now fails five items with six violations, and CORE Story 28 holds two scenarios more, to be accepted again by the user. Third review failed on a `bug`: the rewrite of the report had copied one item into every position of `quality.md`; the file restored from HEAD and its `## Last pass` written once. Fourth review failed on two `risk`: graded F, as a `Done` scenario nothing proves; the CORE-FR-019 violation moved to No conflict, against CORE-SC-005. Fifth review failed on a `risk`: CORE Story 28 scenario 3 reads two ways; and a `q`: whether the developer's quoted answer at `spec-core.md:131` is a violation at all. The user answered: a spec may name what the code does where it is their own review of the code turned into a task; CORE-FR-030 amended, a clarification and an Input line added, the how violation dropped (five violations), scenario 3 rewritten to that rule; the two `nit` fixed at the user's yes (the rescan citations; CORE Story 28 depends on CORE Story 23). Sixth review failed on a `risk`: the guide `sdd-spec-format` holds no exception for the amended CORE-FR-030, against CORE Story 12; reported as a violation (six, in five items), CORE-FR-030's exception widened from a requirement to what a spec writes from the developer's review. Seventh review failed on a `risk`: the CORE-FR-019 violation judged against the spec before its amendment; moved back under the code item, against CORE-FR-019 as amended and CORE-SC-005. Eighth review passed 2026-11-03.

- Resume verification by Codex 2026-11-03: `node --test .cw/charter/script/*/*.test.mjs` 105 pass, 0 fail, 0 skipped; `cw test` 6 cases passed; `cw doctor` nothing to fix; `sdd-specs check` and `doctor` passed; `git diff --check` passed; roadmap generated and opened. Quality report and proposed remediation checked manually. Earlier `cw eval --agent claude` result retained as historical evidence, not rerun this session. Independent review passed, no findings; guides read: `sdd-learnings-go-to-the-inbox`, `sdd-voice`, `sdd-spec-format`.

- Final verification 2026-11-03 after the approved ADR citation: 105 tests passed, 0 failed, 0 skipped; 6 charter cases passed; cw doctor, spec check/doctor and diff whitespace check passed. Independent review passed; its nit about stale Remaining is resolved by this update.
- User accepted CORE Story 28 including widened scenario 3 and the CORE-FR-030 citation on 2026-11-03. Citation added. CORE Story 23 set Done with evidence; no known baseline failures.

## Remaining

- None for implementation. Finish into `004-code-smell` by squash-merge and delete the landed story branch.

## Decisions

- 2026-11-03: `cw eval` runs with `--agent claude`.
- 2026-11-03: the violations are fixed in one story, CORE Story 28 ("1 story thôi").

- 2026-11-03, at the hand-over: CORE Story 28 accepted again, with six violations; both `nit` fixed as proposed; CORE-FR-020 kept as it is, the clarification recording the one story enough, as for CORE Story 11.

## Blockers

- none
