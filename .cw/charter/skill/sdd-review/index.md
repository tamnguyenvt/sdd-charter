---
kind: skill
id: sdd-review
description: Have an agent that did not write the change review it against the story's scenarios, FR and SC — nothing missing, nothing beyond them — and for security issues.
triggers: ["review implementation"]
disable-user-invocation: true
rationale: sdd-concept
---

The change is never reviewed by the agent that wrote it. Write the change to
a temporary file outside the repository — `git diff $(git merge-base <the
branch it started from> HEAD)`, then `git diff --no-index /dev/null -- "<file>"`
for each file `git ls-files --others --exclude-standard` lists — and spawn
[[sdd-review-agent]] with the story's id and `spec-<key>.md`, or a bug fix's
definition of done, and that file's path. Hand it nothing else: never the
conversation, the plan, or the reasoning behind the change.

Relay the guides it read, its findings and its verdict to the walk as it wrote
them; a `nit` or a `q` is handed to the user to decide at the gate.
