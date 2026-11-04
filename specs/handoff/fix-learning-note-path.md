# fix/learning-note-path — handoff

**Updated**: 2026-11-04

## Done

- Opened `fix/learning-note-path` from `develop` at `968600c`.
- Bug: a learning note is written under a folder other than `learning/inbox/` at the repository's root.
- Baseline passed 2026-11-04: `node --test .cw/charter/script/*/*.test.mjs` 110 pass, 0 fail, 0 skipped; `cw test` 6 cases; `cw doctor` nothing to fix; `check` passes. No known failures.
- Seen twice in nine runs of a Vietnamese request to learn, on 2026-11-03, in scratch clones: session `8fb10e8c-41e6-417f-bedb-4b28061d0f82` (`runD`) wrote `docs/learning/inbox/…`, session `67d42344-7a0f-4e33-9485-4e04c6bcdc07` (`after3`) ran `mkdir -p specs/learning/inbox` after reading `.sdd/settings.json` and wrote there. Both had read `.cw/out/skill/sdd-learn/index.md`, which names `learning/inbox/<yyyy-mm-dd>-<slug>.md` with no anchor.

- Report gate approved 2026-11-04.
- Fix: `at the repository's root` added after `learning/inbox/` in `.cw/charter/skill/sdd-learn/index.md` and `.cw/charter/guide/sdd-learnings-go-to-the-inbox/index.md`. Built with `cw build` (`.cw/out/skill/sdd-learn/index.md`, `.cw/out/guide/sdd-learnings-go-to-the-inbox/index.md`, `AGENTS.md`).
- Six fresh scratch clones of `develop` with the fix applied (`path1`–`path6`), each `claude -p "Học từ cuộc trò chuyện này: mỗi lần bàn giao phải nêu tên nhánh đang đứng."` on 2026-11-04: six of six wrote their note under `learning/inbox/` at the root, nothing elsewhere (sessions `38ff8e7b-1ab7-4722-967a-471303689e5c`, `c4aee28a-5e77-474a-9417-3a70568f48e4`, `a1645d32-4197-4250-9359-7ff37b20123a`, `ae1596a0-3ade-4b74-a108-9a47b8d81461`, `19c684d9-d42a-4937-9f1b-cac6c2387f70`, `060365aa-13a6-47a3-87eb-21392785d717`); stderr empty.

- Review passed 2026-11-04; its two nits, lines over 80 columns, re-wrapped and built again.

## Remaining

- None. The developer accepted the fix on 2026-11-04; finishing into `develop`.

## Decisions

- 2026-11-03: the developer chose to fix the English answers and the learning note path each in a bug fix of its own.

## Blockers

- None.
