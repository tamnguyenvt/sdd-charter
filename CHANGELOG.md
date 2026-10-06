# Changelog

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
