# fix/core-27-unproven-language-scenarios — handoff

**Updated**: 2026-11-03

## Done

- Opened `fix/core-27-unproven-language-scenarios` from `develop` to fix the one violation of the quality pass of 2026-11-03 (`quality.md`, `## Last pass`): CORE Story 27 scenario 11, and the first half of scenario 10, proven by nothing.
- Baseline passed 2026-11-03: `node --test .cw/charter/script/*/*.test.mjs` 110 pass, 0 fail, 0 skipped, twice; `cw test` 6 cases; `cw doctor` nothing to fix; `check` and `doctor` pass. No known failures.
- Scenario 11, run C: a scratch clone with `**Document language**: Tiếng Việt`, **While working** set to commit, and `src/sum.mjs` returning `a - b`, in seed commit `12ed708`; the clone's local `develop` set to it before the walk. `claude -p "/sdd-bug-fix hàm sum trong src/sum.mjs trả về hiệu của hai số thay vì tổng"` (session `6ea40650-b6c3-49fd-99ca-476326b0c818`), then resumed with "Có, đi tiếp không cần baseline." and "Đồng ý." at its two gates. It opened `fix/sum-returns-difference` and wrote its handoff note `specs/handoff/fix-sum-returns-difference.md` in Vietnamese. It wrote English code and test (`src/sum.test.mjs`, `test("sum returns the sum of its two arguments", …)`), and committed in English per **Message**: `6f79526` "Fix sum returning the difference instead of the sum of its two arguments" and `c21a8e7` "Record the sum fix's cause, fix and verify evidence in its handoff note". stderr empty.
- Scenario 10, first half, run D: a scratch clone with no **Document language** line. `claude -p "Học từ cuộc trò chuyện này: mỗi lần bàn giao phải nêu tên nhánh đang đứng."` (session `8fb10e8c-41e6-417f-bedb-4b28061d0f82`) wrote its learning note in English. stderr empty.
- Scenario 10, first half, run B: the same clone setup as run D. `claude -p "Ghi lại điều này cho các phiên sau: mỗi lần bàn giao phải nêu tên nhánh đang đứng."`, outside any walk, answered in Vietnamese and wrote `learning/inbox/2026-11-03-handover-names-the-branch.md` in English. stderr empty.
- Run D answered in English and put the note under `docs/learning/` instead of `learning/inbox/`. Run C's hand-over said "Review passed, nothing to put to the user." in English. These are voice and learning faults, outside this fix's definition of done, and are reported to the developer, who chose on 2026-11-03 to land this fix first and fix them in bug fixes of their own.
- A first attempt, run A, asked in English outside any walk and was replaced: the independent review found it could not fail without CORE-FR-066.
- Runtime artifacts, kept only in this session's scratchpad: `/private/tmp/claude-501/-Users-tamnguyenvt-www-cherry-softwares-sdd-charter/42056471-b9e1-40dd-99c3-07f0d05e6e55/scratchpad/runB`, `runC`, `runD`, and their `.json` and `.err` beside them.
- Runs B, C and D written into CORE Story 27's evidence in `plan.json`.

## Remaining

- /sdd-finish into `develop`; then a bug fix each for the English answers and the learning note path.

## Decisions

- 2026-11-03: the developer asked to fix the violation on a branch directly, without /sdd-plan writing a story for it.
- 2026-11-03: both runs B and D named in the evidence; the hand-over accepted.
- No code or charter primitive changes: the behaviour was already there, only its proof was missing.

## Blockers

- None.
