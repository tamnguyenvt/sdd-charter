# fix/answer-in-request-language — handoff

**Updated**: 2026-11-04

## Done

- Opened `fix/answer-in-request-language` from `develop` at `9dd570b`.
- Bug: with no `language` in `.sdd/settings.local.json`, a request in Vietnamese is answered in English, against CORE-FR-044 (CORE Story 27 scenario 4).
- Baseline passed 2026-11-03: `node --test .cw/charter/script/*/*.test.mjs` 110 pass, 0 fail, 0 skipped; `cw test` 6 cases; `cw doctor` nothing to fix; `check` passes. No known failures.
- Reproduced 2026-11-03 in three scratch clones of `develop` (`repro1`–`repro3` in this session's scratchpad), each `claude -p "Học từ cuộc trò chuyện này: mỗi lần bàn giao phải nêu tên nhánh đang đứng."`: two of three answered in English. Session `37cda990-7e88-4f0f-8c38-bf24192ac53e` read the manifest, said "Document language is English.", and answered in English; session `8850c686-da7e-487a-8ac1-87dac47b5931` found no local settings and said "No language override found, so I'll write the learning note in English per the fallback rule." Session `7f3f5303-c2d6-4260-853f-277bb1645dea` answered in Vietnamese.
- Report gate approved 2026-11-03.
- Fix: `.cw/charter/guide/sdd-voice/index.md`, the line joining conversation and document language, now says the conversation never follows the document language and, with no local `language`, follows the user's own words even where every document is in English. Built with `cw build` (`.cw/out/guide/sdd-voice/index.md`, `AGENTS.md`).
- Reproduction run again 2026-11-03 with the fixed guide, in three fresh scratch clones (`after1`–`after3`), the same prompt: three of three answered in Vietnamese (sessions `a9b244aa-872d-466a-9dd7-60f708f507d7`, `01e3e179-b2b1-48f1-afc1-7df987407772`, `67d42344-7a0f-4e33-9485-4e04c6bcdc07`), each learning note in English. stderr held only the CLI's stdin notice. Session `67d42344-7a0f-4e33-9485-4e04c6bcdc07` wrote its note under `specs/learning/inbox/`: the learning note path bug, fixed apart.

## Remaining

- None. The developer accepted the fix on 2026-11-04; finishing into `develop`.

## Decisions

- 2026-11-03: the developer chose to fix the English answers and the learning note path each in a bug fix of its own, after fix/core-27-unproven-language-scenarios landed.

## Blockers

- None.
