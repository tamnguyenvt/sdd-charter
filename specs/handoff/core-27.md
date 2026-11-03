# CORE Story 27 — handoff

**Updated**: 2026-11-03

## Done

- Branch `task/core-27-language-preferences` opened from `004-code-smell`.
- Baseline passed 2026-11-03: source Node suite 105 passed, 0 failed; `cw test` 6 passed; `cw doctor` and spec check passed. No known failures.
- Spec gate accepted with the developer's correction: personal language belongs in `.sdd/settings.local.json`, ignored by `.sdd/.gitignore`, never in machine-wide settings. Shared document language defaults to English.
- Updated voice/init/doctor/report primitives, manifest template, spec script/tests and voice eval case; generated outputs rebuilt with `cw build`.
- Test-first evidence: new doctor cases failed before implementation (2 failures), the non-English report guard failed before implementation, and the translated Todo tooltip regression failed before its fix.
- Final source suite: 110 passed, 0 failed, 0 skipped. `cw test`: 6 passed. `cw doctor`, spec check/doctor, diff whitespace and clean checks passed.
- Interactive test in the main Codex session: existing-setup init asked only the personal language; developer chose Vietnamese; saved the ignored local file and left shared settings/manifest unchanged.
- Fresh standalone Codex runtime runs proved: new init asks the personal language first; accepted new setup saves an ignored Vietnamese preference and creates Spanish documents; existing init saves Vietnamese without changing shared answers; English requests with a Vietnamese preference receive Vietnamese answers; Vietnamese requests with a French preference receive French answers; absent preference falls back to Vietnamese; the exact added voice eval prompt receives Vietnamese. Private preferences are untracked and unstaged, absent from shared settings.
- Codex wrote a Spanish handoff and generated a Spanish roadmap while answering in Vietnamese. A final manual report run with the final script confirmed Spanish labels and Todo tooltip, preserved earlier spec/manifest content and logged no stderr. The scratch host could not open the HTML automatically; the report path was returned as the skill permits.
- Runtime artifacts: `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/core27-manual-g7_ya1yk`, `/tmp/core27-codex-fr.log`, `/tmp/core27-new-init-save.log`, `/tmp/core27-voice-case.log`, `/tmp/core27-documents-es.log`, and their final-response files. These are Codex runtime checks, not a run of the Claude-only `cw eval` harness. Earlier Claude quota failures are historical and do not block these checks.
- User requested merge. Independent Codex review passed with no findings; guides read: `sdd-learnings-go-to-the-inbox`, `sdd-voice`, `sdd-spec-format`. The native reviewer role exposes no file tools in this host; an independent default Codex agent applied its review criteria using read-only filesystem inspection. Story set Done with evidence.

## Remaining

- None. Implementation, verification and independent review are complete; the user authorized finishing into `004-code-smell`.

## Decisions

- Repository-local personal settings only; no machine-wide SDD configuration.
- Use the available Codex runtime for manual verification and an independent Codex agent for review; label the evidence accurately rather than treating Claude quota as a blocker.

## Blockers

- None.
