When proving a walk with a real agent in a scratch repository, commit every setup file (manifest answers, deleted or added files) on the development branch before branching the story, and leave only the story's own change in the working tree.

**Why:** on CORE Story 29 two scratch runs were spoilt: a manifest edited after the commit, and a file deletion committed on the story branch, each read by the reviewer as code beyond the story and failing the review.

**How to apply:** build the scratch repository, commit it on `develop`, branch `task/…` from it, then write only the story's files and handoff note before running the agent.
