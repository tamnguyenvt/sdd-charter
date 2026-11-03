# CORE Story 25 — handoff

**Updated**: 2026-11-03

## Done

- Branch `task/core-25-review-code-smells` opened from `004-code-smell`; story set `In Progress`.
- Baseline passed 2026-11-03: `node --test` 87 pass, 0 fail; `cw test` 6 cases; `cw doctor` nothing to fix; `check` of `sdd-specs` passes once this note exists.

- Spec gate approved by the user on 2026-11-03.
- Four new tests failed before implementation (29 pass, 4 fail), then passed (33 pass, 0 fail).
- Implemented findings grouping, skip/agree marks, same-hash preservation and changed-hash reset; added review/planning gates and behavior-preservation scenarios to the skill; updated script documentation, format guide and README; ran `cw build`.
- Verification so far: explicit source test suite 91 pass, 0 fail; `cw test` 6 cases passed; `cw doctor` nothing to fix; spec link/check and diff whitespace check passed. Plain `node --test` discovers no tests because `.cw` is hidden; used explicit test paths instead.
- Build emitted existing host capability notices for the locator/review agents; doctor reports healthy.

- Real-agent manual verification passed in `/tmp/core25-manual.rrl6ct` (transcript there): grouped two rules; skipped one; planned the other across two files with behavior-preservation scenario using simulated explicit developer answers; left findings waiting until acceptance; marked agreed; rescan/re-record preserved marks; empty path stopped planning. Final `0 waiting, 1 skipped, 2 agreed` and `No finding left to agree.`; all commands exited 0; stderr only normal snapshot counts. Limitation: planning story/roadmap were fixtures, not a complete /sdd-plan validation run.
- Generated Node test suite also passed 91/91. Fresh verification summary: source/generated Node suites each 91 pass, 0 fail; charter tests 6 pass; doctor healthy; spec and whitespace checks pass; scratch real-agent review/skip/plan-fixture/agree/rescan/empty flow passed with no warnings/errors.

## Remaining

- User requested read-only snapshots after the previous hand-over. The user then chose to remove saved exclusions entirely. Implementation and fresh verification passed; final independent review passed with no findings; awaiting hand-over acceptance. Keep changes unstaged and the story In Progress until accepted.

## Decisions

- Accepted at the spec gate: a finding carries `"status": "skipped"` or `"agreed"`, none while it waits on the developer; `findings` of `sdd-smell` prints the waiting ones grouped by rule with their files, and the counts skipped and agreed; `skip` and `agree` take a path, a rule and, optionally, a line; `record` keeps both marks on a finding of the same rule and line while the hash is unchanged, so a rescan does not bring them back; findings are marked agreed only once the user accepts the stories /sdd-plan wrote, each holding a scenario that the product behaves as it did before.

- Supplemental full real-agent planning run passed in `/tmp/core25-full.z6k686`; transcript and reproducible `run.py` retained. Followed all nine /sdd-plan steps with simulated explicit gate answers; wrote full valid spec set; one rule gathered two files into one story, an oversized rule split into order/payment stories, each preserving observable behavior; skipped finding excluded; interval-three quality cross-check added; phase branch created. Actual link/check/doctor/ready passed; manual analyze found 0 errors/warnings. All four findings stayed waiting until final acceptance. Rescan/re-record ended `0 waiting, 1 skipped, 4 agreed` / `No finding left to agree.`; no warnings/errors.

## Review

- First independent review read sdd-learnings-go-to-the-inbox, sdd-voice and sdd-spec-format. Failed: scenario 3 / CORE-FR-058 lacked complete planning execution and oversized-rule splitting evidence. Manual verification agent is completing these in a scratch spec set.

- Independent re-review passed: same guides read; findings none. Fresh full planning verification resolved the original coverage finding.
- Final evidence: source and generated Node suites each 91 pass, 0 fail; `cw test` 6 cases pass; `cw doctor` healthy; spec link/check and whitespace checks pass; full scratch review/skip/plan/split/agree/rescan/empty workflow passed, no warnings/errors.

- User requested command-order explanation in the script documentation. Added ordered snapshot → leave/record → findings → review/skip → plan → accept stories → agree flow, clarified record versus agree, and annotated command examples; rebuilt generated page. Fresh generated Node suite 91 pass, 0 fail; charter cases 6 pass; doctor/spec/whitespace checks passed; independent documentation re-review passed, findings none. No implementation changes.

- User reversal on 2026-11-03: snapshot saves nothing. Updated CORE-FR-051, CORE-FR-054 and CORE Story 24 scenario 2 accordingly. Snapshot now never calls writeRecord; automatic exclusions remain transient; removed-file cleanup happens on explicit record updates. The initial proposal to keep explicit exclusions was superseded by the user's answer: "Chỉ lưu file đã đánh giá, bỏ leftOut".
- Two readonly tests failed before implementation; updated old tests to the revised contract. Fresh source smell suite 35 pass; combined source/generated full suites 186 pass, 0 fail; cw build, 6 charter cases, doctor, spec link/check and whitespace check passed. Manual scratch `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-readonly-_j54gjxk` confirmed fresh snapshots create no folder/record, changed/deleted source snapshots preserve bytes/mtime, next explicit record prunes deleted entry. All commands exit 0; stderr only normal counts. Existing build host-capability notices remain.

- Final user choice: only assessed files are saved; removed leftOut and leave entirely, with legacy exclusions ignored on reads and removed on explicit writes. Updated relevant requirements, scenarios, clarification, record description, script/skill/guide documentation and ADR-001; rebuilt outputs. New contract tests failed 4 cases before implementation, then smell suite passed 35/35. Combined source/generated suites passed 186/186, charter cases 6/6, doctor/spec/diff checks passed. Manual scratch `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-assessed-only-tr8q52r2` covered only-assessed persistence, legacy migration, repeated unassessed paths, readonly snapshots, agreement persistence; removed leave intentionally returns usage exit 2, all positive commands exit 0 without warnings/errors. Independent re-review passed, findings none; read sdd-learnings-go-to-the-inbox, sdd-voice, and sdd-spec-format for spec/ADR changes. Awaiting user acceptance; all changes remain unstaged.

- Latest request on 2026-11-03: renamed snapshot/function to scan, --rescan to --again. Default scans list missing/current-hash-changed assessments; --again never reads old record (even corrupt), lists all assessable paths; successful scan prints only hashes and paths. Updated script/skill/README, requirement/edge case/clarification and ADR-002; rebuilt. Tests failed 22 cases before rename, then smell suite 37/37; full source/generated 190/190; cw test 6/6, doctor/spec/whitespace pass. Scratch `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-scan-again-fn0z2alz` verified incremental scan, changed content, --again ignoring even broken history, unchanged record bytes/mtime, expected errors for corrupt normal history and old names. Independent review passed, findings none; same guides plus spec-format for ADR/spec. Current change awaits hand-over acceptance, remains unstaged.

- Latest documentation request: added concrete command examples to the script page using sample paths, actual SHA-256 values, stdin findings, skip/agree with and without line, and scan/--again. Clearly separates assessment from recording and requires developer gates before skip/planning/agreement. All example Bash blocks executed verbatim in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-doc-examples-77oc0w0h` with simulated gate answers: exit 0, stderr empty, final 0 waiting/1 skipped/1 agreed. Generated suite 95/95; build, 6 charter cases, doctor/spec/whitespace passed. Independent documentation re-review passed, findings none; guides sdd-learnings-go-to-the-inbox and sdd-voice. Changes remain unstaged; story awaits acceptance.

- Latest user request: automatic unique/stable finding ids and `findings <id> skip`, removing standalone skip. Id identity uses path, assessed hash, rule, line and repeated-location occurrence; supplied ids are overridden; legacy records gain ids in memory without read writes. Skip-by-id updates exactly one current finding and rejects unknown/stale/invalid requests without writes. Updated scenario/FR-057, clarification, ADR-003, script/skill documentation and concrete examples; rebuilt. New contract test failed before implementation, then passed; combined source/generated suites 194/194, charter cases 6/6, doctor/spec/whitespace pass. Exact example Bash blocks ran in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-finding-id-sxery6le` with simulated gates: distinct ids, one skipped, other agreed, final 0 waiting/1 skipped/1 agreed; exit 0 and stderr empty. Independent re-review pending. All changes remain unstaged.

- Independent review found agree overwrote a skipped duplicate at the same rule/line. Added failing regression (39 pass/1 fail), excluded skipped findings from agreement selection and documented it. Fresh full source/generated suites 196/196, charter cases 6/6, doctor/spec/diff pass. Manual `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-id-agreement-k20x8rbv` confirmed skip first duplicate by id then agree same location preserves skipped/agreed marks through re-record; exit 0/no stderr. Final independent re-review passed, findings none; guides sdd-learnings-go-to-the-inbox, sdd-voice and sdd-spec-format. Awaiting hand-over acceptance; all changes remain unstaged.

- Latest request: `findings <id> skip [reason]` saves optional quoted reason verbatim in finding.reason. Omission keeps prior reason/absence; unchanged assessments preserve it, changed content clears it; assessment input cannot supply review reasons. Updated FR-057/clarification, skill/script docs and concrete example. New test failed before fix (40 pass/1 fail); fresh combined source/generated suites 198/198, charter cases 6/6, doctor/spec/whitespace passed. Exact documented commands executed with simulated gates in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-skip-reason-l_nsezgk`: supplied reason persisted, final 0 waiting/1 skipped/1 agreed, exit0/stderr empty. Independent re-review passed, findings none; guides sdd-learnings-go-to-the-inbox, sdd-voice and sdd-spec-format. Awaiting hand-over acceptance; all changes unstaged.

- Latest request: symmetrical `findings <id> agree [reason]`, removed standalone agree/path-rule-line selection. Agreement addresses exactly one current id, refuses skipped targets, stores optional reason and retains it for unchanged assessments; same action without reason preserves reason, status changes clear unrelated old reason. Updated tests, script/skill/examples, FR-058 clarification and ADR-004. Test red41pass1fail, fresh combined source/generated200/200; build, charter6/6, doctor/spec/diff passed. Exact documentation commands ran in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-agree-reason-rio_u5kl` with simulated story acceptance: final0waiting1skipped1agreed, agreed reason persisted through repeat action; exit0/no stderr. Independent re-review passed, findings none; guides sdd-learnings-go-to-the-inbox, sdd-voice and sdd-spec-format. Awaiting user acceptance; changes unstaged.

## Blockers

- none

## Landing

- User accepted the change with "ok good" on 2026-11-03. Story set Done and evidence recorded; fresh generated suite 100/100.
- Initial finish check blocked on six sdd-clean debug findings (resolved by console.info below): source and generated smell.mjs lines 201–203. Each is intentional findings CLI output, not debugging. User acceptance of these exact findings is required before commit/squash into 004-code-smell. Nothing staged or committed yet.

- User requested console.info and finish on 2026-11-03; replaced the three official report output calls and rebuilt. Fresh generated tests100/100, charter6/6, doctor/spec landing/whitespace passed; sdd-clean reports nothing left behind. Manual documented workflow passed with unchanged stdout and empty stderr in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/sdd-info-final-_hg7688g`. Independent review passed, findings none. Proceeding to commit and squash into 004-code-smell; remote has no story branch.

## Story-local decisions moved from ADR.md

Moved verbatim by CORE Story 28; retained here as implementation history.

## ADR-003: Address a skipped finding by its id

**Decision**: Each finding receives an automatic, stable id tied to its path,
assessed content, rule, line and occurrence at that location. Review reports
show the id. `findings <id> skip` replaces the standalone skip command and
marks exactly one finding. Agreement retains its existing arguments.

**Why**: The developer wants to choose a finding directly from the report.

**Consequences**: Callers use ids for skipping. Legacy assessments receive
ids on reads without writing; explicit updates persist them. Caller-provided
ids do not override generated identities. Changed content gets new ids.

Source: [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2), [CORE-FR-057](spec-core.md#core-fr-057), revised on 2026-11-03.

## ADR-004: Address agreement by finding id as well

**Decision**: `findings <id> agree [reason]` replaces standalone agreement.
Both review actions address exactly one id and accept an optional reason.
A repeated action without a reason keeps its previous reason; a changed
status clears a previous reason unless replaced. Agreement refuses skipped
findings. Acceptance of the planned story still precedes agreement.

**Why**: The developer requested the same interface and reason support for
agreement as for skipping.

**Consequences**: Callers stop using path/rule/line for agreement. Status and
reason survive unchanged assessments; changed content clears both.
This replaces ADR-003's decision to retain the old agreement arguments.

Source: [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2), [CORE-FR-057](spec-core.md#core-fr-057), [CORE-FR-058](spec-core.md#core-fr-058), revised on 2026-11-03.
