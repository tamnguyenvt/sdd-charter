With **Conversation** short, the hand-over opens on the review's `q` and `nit` themselves: no line saying the story is done, checked and waiting for review, and no line saying the baseline recorded no known failure.

**Why:** the user called those lines unneeded at the hand-over of CORE Story 6; the gate already implies them.

**How to apply:** in `.cw/charter/mixin/sdd-change-rules/index.md` (**Handed over only once checked**), drop "say only that it is done and needs the user's review" for a short conversation, and name the baseline's known failures only when there are some.
