# CORE Story 22 — handoff

**Updated**: 2026-10-31

## Done

- Branch `task/core-22-eval-cases` started from `003-eval-cases`; story is `Done` with verification evidence in plan.json and an independent passing review.
- Baseline and spec gate passed 2026-10-30: 58 Node tests and 6 `cw test` cases.
- Wrote 20 cases: all 16 commands offered by the catalogue (14 SDD commands plus cw-author and cw-session-cost), 2 Vietnamese voice requests, 1 learning-inbox request and 1 spec-format request. No token ceilings.
- Enabled and rebuilt the charter for Claude and Codex; generated outputs are up to date.
- Six internal workflows use `read` rather than `invoke`, because Codex exposes them through `AGENTS.md` and promptfoo's `skill-used` does not recognize their internal instruction paths. The user approved implementing `expect.read` in cherry-works; the story's criteria and CORE-FR-048 now allow this evidence. An instruction read proves loading, not completion.
- Diagnosed the Vietnamese slash-command case: it failed twice because sdd-status required a closing ready list while sdd-voice forbids a closing recap. Changed the sdd-status primitive to put both ready and status counts first, then the story list, without repeating either overview at the end; rebuilt its generated output. A first fix moving only ready still failed because closing counts were also a recap. Guide and grading expectations were not weakened.
- Fresh checks after that change: Node tests 58/58, `cw test` 6/6, spec check, `cw doctor`, clean check against `003-eval-cases`, and `git diff --check` passed.

## Remaining

- No implementation or review work remains. The user requested finishing; this note is retained with the story as it lands by squash-merge into `003-eval-cases`.

## Evidence

- Initial Claude run: 17/18; plan invocation was intermittent; subsequent Claude calls hit its weekly quota. Saved at `/private/tmp/claude-501/-Users-tamnguyenvt-www-cherry-softwares-sdd-charter/11788002-32f1-4057-b1f6-72923e4aed79/scratchpad/eval.log`.
- Initial Codex run and quota retry: `/tmp/core-22-codex-eval.log`, `/tmp/core-22-codex-quota-retry.log`. Missing skill metadata was diagnosed from actual Codex session logs, not assumed to mean instructions were skipped.
- Six internal read cases: 6/6 passed, 970,105 tokens; `/tmp/core-22-read-retry.log`. Each case has retained promptfoo artifacts and a verified local Codex session path.
- Full run before the status fix: 17/18 passed, 3,474,946 tokens; `/tmp/core-22-final-eval.log`. Bug-fix passed, resolving the earlier routing error. The failing voice case's unchanged retry also failed: `/tmp/core-22-final-voice-retry.log` (118,271 tokens).
- Full run after the status fix: 4 passed and 14 quota errors, 611,669 tokens; `/tmp/core-22-status-final-eval.log`. Snapshot: `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/core-22-status-final-y9yopiu2/repo`. All 14 failures reported a usage limit, not a graded behavior failure.
- The quota errors reported retry at 14:18 Asia/Ho_Chi_Minh; the user resumed after that time. Retrying only those 14 cases in `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/core-22-final-quota-retry-xmt7pk0e/repo`; output `/tmp/core-22-status-final-quota-retry.log`.
- Fresh local test output: `/tmp/core-22-status-final-tests.log`; previous check outputs: `/tmp/core-22-final-cw-test.log`, `/tmp/core-22-final-doctor.log`.

- Quota-only retry result: 13/14 passed, 2,783,322 tokens; the slash voice case still failed because the closing status counts were a recap. With four initial passes, sixteen cases pass; both voice cases are being checked again after moving counts first too.
- Final focused voice run: `/tmp/core-22-voice-final-eval.log`, snapshot `/var/folders/dw/m3kz69m95qqb641254ymnvgc0000gn/T/core-22-voice-final-mzq4wjng/repo`.
- Fresh local checks after the final status-order correction: `/tmp/core-22-final-local-tests.log`, `/tmp/core-22-final-local-cw-test.log`, `/tmp/core-22-final-local-doctor.log`; spec check, clean check and diff check also passed.

- Final focused voice result: 2/2 passed, 241,421 tokens; both requests followed sdd-voice after the final status-order correction.
- Verification line: Node tests 58/58; cw test 6/6; cw doctor, spec check, clean check and diff check passed; real-agent eval: 4/18 passed before quota, quota retry 13/14 passed, then both affected voice cases passed 2/2 after the status-order correction (241,421 tokens), yielding passing evidence for all 18 cases; historical failures retained in the handoff.

- First independent Codex review failed one risk: CORE-SC-006 also covers engine commands cw-author and cw-session-cost. Added their plain-English invocation cases; both passed (304,858 tokens), `/tmp/core-22-builtin-eval.log`. Catalogue-to-case coverage check now matches all 16 command IDs exactly, with 20 cases in total.
- Updated verification line: Node tests 58/58; cw test 6/6; doctor/spec/clean/diff checks passed; all 16 catalogue commands covered in 20 cases; 16 cases passed in the full run and quota retry, affected voice cases passed 2/2 after the status-order correction, and both added engine invocation cases passed 2/2 (304,858 tokens).

- Independent Codex re-review passed with no findings. It read sdd-learnings-go-to-the-inbox and sdd-voice for every changed file, and sdd-spec-format for the spec. The previous CORE-SC-006 coverage risk was resolved. Review diff: `/tmp/core-22-review.diff`; verification line: `/tmp/core-22-verify-line.txt`.

## Decisions

- The user explicitly authorized independent Codex review for CORE Story 22 only on 2026-10-31 after an Opus availability probe returned HTTP 429 / weekly limit. General CORE-FR-001 and the agent's Opus model setting remain unchanged. Probe: `/tmp/core-22-opus-availability.json`.

- Real-agent eval runs in throwaway clones; their snapshots are committed only there. The original staged files are left staged, with subsequent work unstaged until finish.
- Fixture commits need process-only `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=commit.gpgsign GIT_CONFIG_VALUE_0=false` when the 1Password signing socket is unavailable; no persistent Git configuration was changed.
- Detailed eval authoring documentation belongs to cherry-works (`docs/how-to-write-eval.md`), not this charter's eval folder.
- cherry-works support for read expectations, retained promptfoo artifacts and offline analysis was committed separately as `5dcbe36` on its develop branch.

## Blockers

- None. The user authorized the one-story Codex review exception; no general review policy was changed.
