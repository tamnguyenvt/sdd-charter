# CORE Story 21 — handoff

**Updated**: 2026-10-29

## Done

- Branch `task/core-21-keep-handoff-note` opened from `002-trust-across-sessions`; story set `In Progress`.
- Baseline passed 2026-10-29; spec gate passed 2026-10-29.
- Built: `check` keeps a `Done` story's note and still fails one for a story `Todo` (tests turned first); /sdd-implement keeps the note at Done; /sdd-finish no longer refuses it; /sdd-bug-fix keeps the fix's note at landing; the format guide and `check`'s description say kept.
- A clone run on opus: /sdd-finish landed a Done story with its note in the squash commit.
- First review failed: the fix-note decision was not in the spec (now CORE-FR-009, the entity, two clarifications); a repeated sentence in /sdd-implement (cut).
- Second review failed: clarifications dated 2026-10-29 now; the Todo rule written into CORE-FR-009; a bug fix's note kept at landing, proven by a clone run: /sdd-bug-fix on opus landed in develop with `specs/handoff/fix-ready-lists-done-stories.md` in the commit, check passing.
- Third review passed 2026-10-29 with one `nit` (the blank line in this list, removed).

## Remaining

- none: approved and set `Done` 2026-10-29; this note stays, as the story itself asks.

## Decisions

- A fix's note is kept at landing too.
- A note for a story `Todo` still fails `check`.

## Blockers

- none
