---
kind: playbook
id: sdd-implement
description: Implement a ready story of the spec set — pick it, baseline, spec gate, test first, verify, review — the way manifest.md says, and mark it Done.
triggers: ["implement task", "implement next task", "implement the next story", "implement story"]
rationale: sdd-concept
mixins: [sdd-voice, sdd-change-rules, sdd-iron-laws]
---

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
     ([[sdd-specs]]).
   - With **Order** parallel and several ready, offer an agent and a worktree
     to each.
   - Open the story's branch, and set it `In Progress`.
   - Find the code it touches with [[sdd-locator]].
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
   - Set the story `Done`, and run `check` of [[sdd-specs]].
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
