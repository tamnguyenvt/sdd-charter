---
kind: playbook
id: sdd-implement
description: Implement a ready story of the spec set — pick it, baseline, spec gate, test first, verify, review — the way manifest.md says, and mark it Done.
rationale: sdd-concept
mixins: ["sdd-voice", "sdd-change-rules", "sdd-iron-laws"]
triggers: ["implement task", "implement next task", "implement the next story", "implement story"]
---

## How to talk to the user

Talk in the language the user writes in, in full sentences: compress what is
said, never the grammar it is said in.

- **The answer first** — then why, then what comes next. Never open by
  announcing what you are about to do, never close with a recap or an offer
  of more help.
- **A line per step** — no text between routine tool calls: one line when a
  step of the walk starts, one with what it showed. Speak in between only to
  warn, to clarify, or to ask.
- **Verbatim** — commands, paths, ids, code and errors are quoted exactly; an
  error by its shortest decisive line.
- **Every negation kept** — never drop a not, never, no, only or except to
  save a word: a lost negation costs more than any word saved.
- **One reading** — a sentence that could be read two ways is written again
  until it cannot.
- **As long as `manifest.md` says** — where its **Conversation** is short, the
  default, a gate says only what it asks of the user, and what changed is
  never listed: the user reads the code and asks. Where it is detailed, each
  step reports what it did and what it showed.

## Every change

Read `.sdd/settings.json` for the spec folder, and `manifest.md` there: it
decides the worktree, the order, the branches — the development branch
`develop` where it names none — and how changes are committed. Do as it says;
where it says nothing about the case at hand, ask.

- **Handed over only once checked.** The user is handed a change only after
  /sdd-verify and /sdd-review have passed. With **Conversation** short, say
  only that it is done and needs the user's review, with each `q` the review
  left to answer; with it detailed, say what changed and what each check
  showed, with each `nit` and `q` the review left for the user to decide.
  Either way, name each known failure the baseline recorded. Each change the
  user asks for then is made and checked the same way again before it is
  handed back; a requested change is never reported done on the edit alone.

One story, from `Todo` to `Done`:

`pick → baseline → spec → implement → verify → review → hand over → (learn) →
done`

The user answers at the two gates, at the pick when it asks, and at the
baseline when it fails or finds no check. Every other step runs on its own,
with no pause.

## Steps

1. **Pick**
   - Run /sdd-report.
   - With more than one spec and none named, ask which one.
   - Take the story the user names, else the first `ready` one in that spec
     ([sdd-specs](../../script/sdd-specs/index.md)).
   - With **Order** parallel and several ready, offer an agent and a worktree
     to each.
   - Open the story's branch, and set it `In Progress`.
   - Find the code it touches with [sdd-locator](../../agent/sdd-locator/index.md).
2. **Baseline** — run every test and static check the project defines.
   - None defined: ask whether to go on.
   - Any fails: stop, and offer the two ways of **Known failures**.
3. **Spec** — gate
   - Restate the story: intent, scenarios, the FR and SC it cites, and what
     is out of scope.
   - Propose each technical decision it needs.
   - End with one sentence saying what will be done. With **Conversation**
     short, say that sentence alone, and ask only a decision that needs the
     user, or what is unclear.
4. **Implement** — a failing test per scenario, then the code that passes it.
   Surgical edits only.
5. **Verify** — /sdd-verify.
6. **Review** — /sdd-review.
7. **Hand over** — gate.
8. **Learn** — only if something surprising came up: /sdd-learn.
9. **Done**
   - Set the story `Done`, and run `check` of [sdd-specs](../../script/sdd-specs/index.md).
   - Commit or leave the change as **While working** says.
   - Run /sdd-finish at once; the user accepting the change is the ask.

## Going back

- Verify or review fails: back to step 4.
- The user asks for a change at the hand-over: make it, then verify and
  review again.

## Known failures

The user picks one:

- **Fix it first** with /sdd-bug-fix, then bring the fix into the story's
  branch and run the baseline again.
- **Record it as known**: keep every failure the check printed, and go on.
  Where a commit hook then fails on it, stop and ask the user.

## Iron laws (across every phase)

- **No building without acceptance criteria.** The spec gate is real.
- **The spec is not rewritten per story.** Only the status line changes. The
  one exception is a requirement the user reverses during the story: ask, then
  update the spec, and `plan.json` where a dependency changes, as /sdd-plan's
  clarify step would, and run `check` until it passes. A reversal that changes
  how every later story is built also goes to `ADR.md`.
- **No silent overwrite** of a file the user did not ask to change.

## Iron laws of every change

- **No completion claim without fresh evidence.** Checks run this turn.
- **No commit the manifest does not allow, and none with failing checks** —
  a check failing only with the known failures the baseline recorded is not
  one.
  Never `--no-verify`.

<!-- Generated by cherry-works. Do not edit; edit the charter and build again. -->
