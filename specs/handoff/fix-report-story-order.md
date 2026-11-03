# fix/report-story-order — handoff

**Updated**: 2026-11-03

## Done

- Baseline passed 2026-11-03: `node --test` 58 pass, `cw test` 6 cases, `cw doctor` nothing to fix, `check` clean.
- Reproduced with the plan of `004-code-smell`: `report` puts CORE Story 27 (ready) in column 0 among Done stories, CORE Story 26 (ready) in column 1, and Done CORE Stories 19 and 20 in column 4, right of both.
- Root cause: `reportHtmlOf` places a story by its depth of dependency alone, whatever its status.
- Fix approved 2026-11-03. Test "report draws every Done story left of every story not Done…" failed first (`1 left of 4`), then passed.
- Fixed in `reportHtmlOf`: a Done story's depth counts only Done dependencies, the rest only dependencies not Done, offset past the Done columns.
- Verify 2026-11-03: `node --test` 59 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` exit 0; the repro now puts every Done story at x=24…1104 and 26, 23, 27 together at x=1374.
- First review failed: the test had no In Progress story (story 5 is now In Progress; it fails without the fix). Second review passed 2026-11-03.
- Accepted by the user 2026-11-03.

## Remaining

- none: landed in `develop`.

## Decisions

- Rows within a column keep plan.json order.
- Accepted without answering the review's `q` (an In Progress story waiting on one not Done stays right of what it waits on) or its two `nit`s (the header comment of `reportHtmlOf`, the unchecked `spawnSync` result): left as they are.

## Blockers

- none
