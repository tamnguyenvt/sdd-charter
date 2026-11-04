---
kind: template
id: sdd-handoff
description: The skeleton of a handoff note, <spec folder>/handoff/<prefix>-<n>.md in lower case (core-3.md for CORE Story 3) or fix-<slug>.md — where a story In Progress or a bug fix stands, for the next session to resume from.
---

# [CORE Story 3, or fix/<slug>] — handoff

**Updated**: [yyyy-mm-dd]

## Done

- [the baseline: passed, or each known failure as the check printed it; the agent that ran it]
- [the spec gate: passed on yyyy-mm-dd]
- [what is built and checked, by file or scenario; the agent that ran each check]
- [the verification: what was run, by which agent, and what it showed]

## Remaining

- [the step to go on at, then what is left to build or check, in order]

## Decisions

- [each decision taken with the user, and its answer]

## Blockers

- [what stops the story, and who or what it waits on; none — one agent's quota limit is none while another available agent can run the check]
