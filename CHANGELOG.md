# Changelog

## Unreleased

- The review is made by a new agent, `sdd-review-agent`, that did not write the change: it is handed only the story's id and spec, or a bug fix's definition of done, and the diff; it reads the FR, SC and guides that apply itself, and grades each finding `bug`, `risk`, `nit` or `q`.
- `/sdd-implement` checks the baseline once the story is picked, and `/sdd-bug-fix` once the bug is understood, before the first change: every test and static check the project defines is run. When one fails, the walk stops and offers to fix it first through `/sdd-bug-fix` or to record it as a known failure and go on. A check that fails only with the failures the baseline recorded does not fail `/sdd-verify`, and is named at the hand-over. A project that defines no check is said to define none, and you are asked whether to go on.
- `sdd-implement` is cut to short steps that say only what the agent cannot infer, with the hand-over a step of its own, and where a failure goes back to and how a known failure is handled each in a section of its own.
- A story `In Progress` keeps a handoff note, `<spec folder>/handoff/<prefix>-<n>.md` from the new `sdd-handoff` template: what is done, what remains, the decisions taken and what blocks it. `/sdd-implement` writes it when it opens the story, brings it up to date before every stop, and removes it at `Done`; picking a story `In Progress` up again, it reads the note first, says where the note and the code differ — the code wins — and asks nothing the note answers. `check` of `sdd-specs`, run when the agent stops, fails on a story `In Progress` with no note — unless notes are ignored — and on a note for a story that is not; where notes are ignored, the note is asked for by `/sdd-implement` alone. `/sdd-init` asks whether notes are committed, the default, or ignored, writes it to `manifest.md` as `Handoff notes` under `## Committing`, and adds `handoff/` to the spec folder's `.gitignore` when they are ignored. An existing `manifest.md` without the line commits them.
- `/sdd-finish` refuses to land a story or a fix on an unclean state. Before it commits anything, it runs `check` of `sdd-specs`, which fails on a handoff note of a `Done` story, and the new script `sdd-clean` against the branch the change lands in: every line the change adds — committed on the branch, staged or not, untracked — is looked at for a stray or temporary file, debug output (`console.log` and `print` among it, in code only), a leftover marker and a secret, each named as `<path>:<line>`, a secret by its kind alone. A finding you accept for that change is passed as `--accept <path>:<line>` and no longer blocks it; nothing is stored.
- A story set `Done` keeps the proof that it works: `/sdd-implement` writes `"evidence": { "summary": "<one line>", "date": "yyyy-mm-dd" }` into its `plan.json` entry, from the one line `/sdd-verify` now ends its report on. `check` of `sdd-specs` fails on evidence for a story that is not `Done` — a story set back from `Done` loses it — and on evidence of another shape; a `Done` story with none, as stories landed before, still passes. `/sdd-finish` runs it as `check --landing "<story id>"`, so a story landing with no evidence is refused.
- `/sdd-verify` reads the runtime while it runs the story by hand: what the program logged and printed — its output and error streams, its log files, the browser console — is reported, or said to be empty, and an error or a warning raised on the story's path fails the step, quoted as it was printed.
- The review sees what verify proved: `/sdd-review` runs `/sdd-verify` first, stops on its failure, and hands `sdd-review-agent` the line verify ended on with the diff. A scenario, FR, SC or point of a definition of done counts as proven by a test that would fail without it or, where no test can hold it, by a run that line names; one proven by neither fails the review. `/sdd-implement` and `/sdd-bug-fix` verify and review in one step, and `/sdd-verify` reports a failing check, never fixes it itself.
- Each part is graded over time. The new skill `/sdd-quality` grades each spec A–F on verification passing, agent understandability, test stability, boundaries kept and conventions followed, and overall, each grade with its reason citing stories, FR or SC and the grade the pass before gave, into `quality.md` in the spec folder from the new `sdd-quality-doc` template; a spec with no `Done` story is `—`. It then offers the lowest-graded part for cleanup. `/sdd-implement` names that part before it draws the roadmap, and builds a quality cross-check story by running the pass, never setting it `Done` before the cleanup offer is answered. `/sdd-plan` adds a `Quality cross-check of …` story after every five stories since the last one, depending on them; `/sdd-init` asks the number and writes it to `manifest.md` as `Quality cross-check`, and a manifest without the line reads as 5.
- `/sdd-implement` has no check drift step any more: the review already holds every changed hunk to the guides that apply, line by line, old code on a changed line included.

## 0.1.12 — 2026-10-21

- The specs are linked and checked when the agent stops in a subfolder of the repository too, not only at its root.

## 0.1.11 — 2026-10-21

- `/sdd-init` asks whether to leave changes unstaged until the story or fix is finished, the default, or to commit at each step that passes its checks.

## 0.1.10 — 2026-10-07

- `/sdd-init` asks what happens to a story or fix branch once it has landed: delete it locally and on the remote, the default, delete only the local branch, or keep it, and writes it to `manifest.md` as `Branch after finishing` under `## Finishing`. `/sdd-finish` then deletes the branch as it says, never one with an open pull request, never a phase branch. An existing `manifest.md` without the line keeps the branch, as before, and `/sdd-finish` offers `/sdd-cleanup`.

## 0.1.9 — 2026-10-07

- `/sdd-init` asks whether the conversation is short, the default, or detailed, and writes it to `manifest.md`. Short: the spec gate is one sentence, asking only a technical decision or what is unclear, and a finished story or fix is handed over in one line for your review. Detailed is how it was. Add a `Conversation` line under `## Talking` to an existing `manifest.md`, or short is assumed.
- `sdd-review` grades each finding `bug`, `risk`, `nit` or `q`: a `bug` or `risk` fails the review, a `nit` or `q` is yours to decide at the gate.
- A new `sdd-locator` agent finds the code a story or a bug runs through and names it as `path:line` ranges, so the main conversation reads only those.
- What `/sdd-implement`, `/sdd-bug-fix` and `/sdd-plan` share — how they talk to you, how a change is handed over, the iron laws — is written once, in the mixins `sdd-voice`, `sdd-change-rules` and `sdd-iron-laws`.
- The README lists only the commands you run.
- Needs a `cw` that knows an agent's `model` and a mixin's `position`; an older one runs `sdd-locator` on the default model and puts the iron laws first.

## 0.1.8 — 2026-10-06

- Rebuilt with the latest `cw`.

## 0.1.7 — 2026-10-06

- Only `/sdd-init`, `/sdd-plan`, `/sdd-implement`, `/sdd-bug-fix`, `/sdd-status` and `/sdd-report` are offered as commands; the steps they run, such as review and verify, are opened by the agent alone. Needs a `cw` that knows `disable-user-invocation`.

## 0.1.6 — 2026-10-06

- New `/sdd-bug-fix` fixes one bug on a `fix/` branch: it reproduces the bug with evidence, reports the cause and the fix for your yes, and lands the fix in your development branch.
- `/sdd-init` asks for your development branch, `develop` unless you name another; add a `Development branch` line to an existing `manifest.md`, or `develop` is assumed.

## 0.1.5 — 2026-10-06

- New `/sdd-cleanup` lists the story and phase branches whose work has landed and deletes the ones you confirm.
- `/sdd-implement` draws the roadmap before it picks a story, and `/sdd-finish` draws it again once the story has landed.

## 0.1.4 — 2026-10-04

- `/sdd-implement` verifies and reviews a change on its own before handing it to you, and again after each change you ask for.
- `/sdd-implement` runs `/sdd-finish` as soon as the story is accepted as done.

## 0.1.3 — 2026-10-04

- `/sdd-finish` stages and commits whatever a story left uncommitted, instead of refusing.

## 0.1.0 — 2026-10-02

- First release: spec-driven development over a spec set — `spec.md` as index, one `spec-<key>.md` per part with ids under its prefix, and `plan.json` for story dependencies.
- `/sdd-init` finds the specs a repository already has, offers to refactor them, and records how work is carried out and finished in `manifest.md`.
- `/sdd-plan`, `/sdd-implement` and `/sdd-finish` take a story from request to merge, with `/sdd-status`, `/sdd-report`, `/sdd-analyze`, `/sdd-verify`, `/sdd-review` and `/sdd-learn` beside them.
- Needs a Cherry Works that names primitives by id alone (the release after 0.4.0).
