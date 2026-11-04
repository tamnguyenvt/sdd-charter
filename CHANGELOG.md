# Changelog

## 0.1.15 — 2026-11-04

- `sdd-review-agent` no longer asks as a question what the story, the guides or the repository already answer.
- With no language chosen, commands answer in the language of your own words, even when every document is written in English.
- `/sdd-learn` and every learning note go to `learning/inbox/` at the repository's root, never under the spec folder or `docs`.

## 0.1.14 — 2026-11-03

- `/sdd-code-smell` assesses a repository's files one by one against the charter's coding rules and keeps what it finds in `code-smell.json` in the spec folder; it changes no code and runs only when you start it.
- `/sdd-code-smell` shows its findings for review, lets you skip each one with a reason, and hands the rest to `/sdd-plan` as one story per rule that keeps the product's behaviour; findings are marked agreed only once you accept those stories.
- `/sdd-report` shows the code smell record below the roadmap: files assessed and good, and each finding by rule, waiting, skipped or agreed.
- The roadmap keeps every `Done` story left of every story not `Done`.
- Each developer chooses the language they are talked to in; `/sdd-init` saves it in `.sdd/settings.local.json`, kept out of git, and asks the repository's document language, written to `manifest.md` as `Document language`. A manifest without that line reads as English.
- Specs, roadmap labels, handoff notes, quality reports and learning notes are written in the document language; `/sdd-doctor` reports in your own language.
- `/sdd-plan` places a phase's new stories after every unfinished quality cross-check, so none can start before it is `Done`.
- A spec may name the command, flag or output that your own review of the code names, and no other implementation detail.

## 0.1.13 — 2026-10-31

- Changes are reviewed by an independent `sdd-review-agent`, using the story, its requirements, the applicable guides and fresh verification evidence; bugs, risks and unproven scenarios block completion.
- `/sdd-implement` and `/sdd-bug-fix` check the project's baseline before making changes; a failing baseline lets you fix it first or record its failures as known.
- Stories in progress and bug fixes keep a handoff note for the next session, and finished work retains it; `/sdd-init` asks whether notes are committed or ignored.
- `/sdd-finish` checks for temporary files, debug output, leftover markers and secrets before committing, and lets you accept individual findings for that change.
- Finished stories keep dated verification evidence in `plan.json`, and `/sdd-finish` refuses to land one without it.
- `/sdd-verify` checks runtime output as well as automated checks, and reports failures without fixing them itself.
- `/sdd-quality` checks the code and every spec against the project's checklist, gives one overall grade, and turns violations into planned stories; quality cross-checks are planned at the interval chosen during setup.
- `/sdd-doctor` checks the spec setup and identifies the setup question that resolves each missing answer; engine health remains `cw doctor`'s responsibility.
- `/sdd-init` asks whether review is strict or quick; quick review records nits and settles small questions in the handoff, while strict review leaves them for you.
- Commands answer in the language of your request, including words after a slash command, and give a recommendation before asking a question.
- `/sdd-status` puts ready stories and status counts first, then the story list, without repeating the overview at the end.
- `/sdd-finish` reports the merged branch, current branch, next ready stories and recommended story in four bullets.
- This repository now builds its charter for both Claude and Codex.
- Twenty real-agent evaluation cases cover every offered command, Vietnamese responses, the learning inbox and spec format; internal workflows use successful instruction reads where Codex cannot expose skill-invocation metadata.

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
