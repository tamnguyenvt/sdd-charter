# fix/review-asks-only-real-questions — handoff

**Updated**: 2026-11-03

## Done

- Opened `fix/review-asks-only-real-questions` from `develop`: the reviewer put to the developer as a `q` whether to name a second run in the evidence, a question with one plain answer (fix/core-27-unproven-language-scenarios, the review whose evidence named run D and not run B).
- Baseline 2026-11-03 on `develop` at `b96a80f`: `node --test .cw/charter/script/*/*.test.mjs` 110 pass, 0 fail, 0 skipped; `cw test` 6 cases; `cw doctor` nothing to fix; `check` passes. No known failures.
- `sdd-review-agent`: a `q` is never one the story, its FR and SC, the guides or the repository answer; such a finding is graded by that answer. Built with `cw build`.
- Spec: an Input line, a clarification, CORE-FR-002 amended, CORE Story 1 scenario 3 added.
- Scenario 3, run E: scratch clone `runE` holding the state of the review whose evidence named run D and not run B and the reviewer under test; `claude -p` spawned `sdd-review-agent` with that review's prompt: under the first wording (session `178a7e94-81a1-492d-afcb-215880b85d2d`) and under the final one (session `776cb80f-29c8-4d97-849d-c7914a55e653`, `runE2.json`). Neither asked a `q`; each named run B as the fix of its finding. The reviewer before the change, on that review, asked it as a `q`: "Có chấp nhận runD một mình là đủ cho nửa đầu scenario 10 không? Nếu không, hãy nêu runB bên cạnh runD trong evidence". stderr empty.
- Run E written into CORE Story 1's evidence in `plan.json`.

## Remaining

- None. The developer accepted the hand-over on 2026-11-03; finishing into `develop`.

## Decisions

- 2026-11-03: the developer asked that the reviewer ask only what needs asking, and nothing obvious.
- 2026-11-03: the clause that a question every answer of which leaves the change right is a `nit` was dropped at review: the `q` line already excludes a question whose answer does not decide whether the change is wrong.

## Blockers

- None.
