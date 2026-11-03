# CORE Story 26 — handoff

**Updated**: 2026-11-03

## Done

- Branch `task/core-26-code-smell-in-report` opened from `004-code-smell`, rebased onto `develop` first at the user's choice; story set `In Progress`.
- Baseline passed 2026-11-03: `node --test` 101 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` exit 0.
- Spec gate passed 2026-11-03.
- Four tests in `specs.test.mjs`, one per scenario and one for a finding's own `path`, failed first, then passed; `codeSmellOf` and the code smell section of `reportHtmlOf`; the `report` doc of `sdd-specs` and step 4 of `/sdd-report`.
- Verify 2026-11-03: `node --test` 105 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` exit 0; `report` run by hand with no record, a record of 2 files and 1 skipped finding with reason, an unreadable record, and a finding carrying its own non-string `path`: the roadmap drawn each time, the section saying what the record held or why it could not be read.
- First review failed on a `risk`: a finding's own `path` overrode its file's; fixed as `{ ...finding, path }`, test first. Second review passed 2026-11-03. After the guide row, verify again (105 pass) and a third review passed 2026-11-03.

## Remaining

- none: accepted by the user 2026-11-03; the story is `Done`.

## Decisions

- 2026-11-03: `004-code-smell` rebased onto `develop` (it was not pushed), so the report fix 989ba0f is under this story.
- Every finding is shown, waiting ones included, with its status and reason; rules and files sorted by name.
- 2026-11-03, at the hand-over: the counts of files assessed and good are enough for "its files" (the `q`); the `report.html` row of `sdd-spec-format` now names the code smell section (`nit`, agreed).
- 2026-11-03, on the `nit` of a dangling `code-smell.json` link: the user wants `scan` of `sdd-smell` to record each link as skipped with the reason "symlink", and files git ignores not scanned (they already are not). Told that `scan` already skips links without recording them, the user dropped recording them: skipping at `scan` is enough, and it already does, proven by the test "a link is excluded without creating a record"; no change.

- Accepted without answering the third review's `nit` (the grouping by rule in `reportHtmlOf` in one expression): left as it is.

## Blockers

- none
