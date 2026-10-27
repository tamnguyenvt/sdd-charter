Build the diff /sdd-review hands its agent with `rtk proxy git diff`, never a plain `git diff`, on a machine where the rtk hook is installed.

**Why:** the rtk hook rewrites `git diff` into a summary — a stat table and trimmed hunks — so the review of CORE Story 4 was first handed a file holding only the untracked files' patches whole and the tracked ones as a summary.

**How to apply:** in `.cw/charter/skill/sdd-review/index.md`, say the diff is written raw, bypassing any output filter (`rtk proxy git …` where rtk is installed), and check that the file holds a `+++ ` header per changed file before spawning the agent.
