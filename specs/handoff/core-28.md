# CORE Story 28 — handoff

**Updated**: 2026-11-03

## Done

- Opened `task/core-28-quality-findings` from `004-code-smell`; selected the only ready story.
- Baseline passed: source Node suite 110 passed, 0 failed, 0 skipped; `cw test` 6 passed; `cw doctor`, spec check and spec doctor passed. No known failures.
- Roadmap regenerated and opened.
- Spec gate accepted on 2026-11-03.
- Six scenario assertions failed before edits, all six passed after edits; temporary verification script: `/tmp/core28-check.py`.
- Manual `/tmp/core28-manual.py` applied the planning instructions to a scratch roadmap: existing and intra-phase quality gates blocked later stories, independent stories became ready together after acceptance, check/report/ready exited 0 with empty stderr. Verified all four ADR bodies preserved verbatim; all three generated primitives retain the narrow developer-review exception. Scratch: `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/core28-manual-lw2ieh1g`. No separate runtime logs produced. This was a manual application of the instructions, not a full real-agent planning walk.
- Inspected the retained Story 25 transcript and final skip/agree record before citing them in its evidence: planning waited for acceptance and included behavior-preservation scenarios; final id-based run retained one skipped and one agreed finding.
- Fresh verification: source and generated Node suites each 110 passed, 0 failed, 0 skipped; charter cases 6 passed; doctor/spec check/spec doctor/clean/whitespace checks passed; six scenario assertions and manual roadmap/decision migration checks passed, with empty runtime stderr. No known baseline failures.
- Build emitted the existing Codex locator/reviewer capability notices; doctor is healthy. Corrected one trailing blank line caught by diff whitespace checking.
- User accepted the hand-over on 2026-11-03; set the story Done and recorded verification evidence.
- Independent review passed with no findings. Guides read: `sdd-learnings-go-to-the-inbox`, `sdd-voice`, `sdd-spec-format`. Used an independent default agent with read-only inspection because the native reviewer role has no file tools on this host.
- Located changes in the planning playbook, spec-format guide, analyze skill, spec, ADR file, story 24/25 handoff notes and story 25 evidence. Native locator role has no file tools on this host; inspected these paths directly.

## Remaining

- None. User accepted the hand-over on 2026-11-03; finishing into `004-code-smell`.

## Decisions

- Accepted: use explicit dependencies on unfinished quality cross-checks; keep the developer-review exception narrow; migrate all four story-local decisions verbatim into handoff notes; cite recorded runtime runs in story 25 evidence; use “rescan” consistently.
- These spec/evidence/ADR corrections are explicitly required by this story; preserve the historical quality report.

## Blockers

- None.
