End the report of /sdd-finish with four bullets: `branch <x> merged to <y>`, `current branch: <z>`, `next ready tasks: <numbers>`, `recommend: <id>: <title>`.

**Why:** the user asked for it after CORE Story 3 landed; a paragraph saying the same thing was harder to scan.

**How to apply:** change the **Report** step of `sdd-finish` in `.cw/charter/skill/sdd-finish/index.md` to end with these bullets, the recommendation being the first `ready` story in `plan.json` order.
