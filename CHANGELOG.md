# Changelog

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
