Where a project has no package.json, Makefile or CI config, the baseline finds every test file itself (`find . -name "*.test.*"`, `.git` aside) instead of running the one a story's evidence names.

**Why:** CORE Story 9's baseline ran `sdd-specs` tests alone, 35 of them, and missed the 15 of `sdd-clean`; the gap surfaced only in the quality pass.

**How to apply:** at the baseline and at /sdd-verify, list the test files and static checks found before running them, and run all of them.
