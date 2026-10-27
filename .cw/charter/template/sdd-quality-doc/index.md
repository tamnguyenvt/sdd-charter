---
kind: template
id: sdd-quality-doc
description: The skeleton of quality.md — each spec's grade per criterion and overall, with the reason and the grade the pass before gave.
---

# Quality

**Graded**: [yyyy-mm-dd], [by <the cross-check story's id> | on request]

**Lowest**: [Core] — [C]

| Spec | Verification | Understandability | Test stability | Boundaries | Conventions | Overall |
|---|---|---|---|---|---|---|
| [Core](spec-core.md) | [B (was A)] | [A (was A)] | [A (new)] | [C (was B)] | [A (was A)] | [B (was A)] |

## [Core]

- **Verification passing**: [B (was A)] — [the test of CORE Story 5 scenario 2 is skipped in one run of two.]
- **Agent understandability**: [A (was A)] — [nothing found.]
- **Test stability**: [A (new)] — [every test of a `Done` story passed twice.]
- **Boundaries kept**: [C (was B)] — [CORE Story 6 bent CORE-FR-010: …]
- **Conventions followed**: [A (was A)] — [nothing found.]
- **Overall**: [B (was A)]
