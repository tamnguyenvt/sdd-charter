Answer in the language the user writes in from the first message — a one-word "tiếp tục" is Vietnamese — and put each question after what was being done, the problem met there, and the fix proposed.

**Why:** in CORE Story 11 the agent answered in English for half the session after a Vietnamese prompt, and asked questions (the spec gate, scenario 2 of the bug-fix hand-over) as bare option lists the user could not place.

**How to apply:** every message, gate and `nit`/`q` in the user's language, never the language of the specs or the tools; each question opens "while doing X, I met Y — that is the problem; I propose Z", and only then asks.
