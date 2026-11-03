# Quality

The checklist /sdd-quality checks against, item by item. Add, change or drop
items as this project needs; each must be one a pass can find passing or
failing.

## Code against the stories

- Every scenario of a `Done` story is held by a test that would fail without
  it, or by the run its evidence in `plan.json` names.
- Every test and static check the project defines passes, twice in a row,
  none skipped.
- The code of each `Done` story does what its FR say, and no later change
  bent an FR it cites.
- No code does what no FR asks for, and nothing an out of scope excludes is
  built.
- The code keeps the guides that apply to it.

## Specs against each other

- **Consistent** — a term means one thing in every spec, and one thing has
  one term.
- **Complete** — every FR is cited by a story, every scenario cites an FR or
  SC and can be tested, every edge case is answered by an FR, every SC has a
  number to measure.
- **No conflict** — no two FR, stories, clarifications, assumptions or out
  of scope lines contradict each other, in one spec or across specs.
- **Roadmap** — every dependency in `plan.json` is borne out by the stories,
  and `check` passes.
- **Format** — every spec keeps the spec format of the charter's
  `sdd-spec-format` guide.

<!-- Add the checks this project needs, under either heading or one of your
own: one line each, something a pass can find passing or failing — "Every
endpoint checks the caller's role", "No query is built by string
concatenation". The quality pass writes its report under `## Last pass` below
this comment; leave that section to it. -->

## Last pass

**Date**: 2026-11-03, on request

Run: `node --test .cw/charter/script/*/*.test.mjs` twice: 110 pass, 0 fail, 0 skipped each time; the generated suite `.cw/out/script/*/*.test.mjs` 110 pass, 0 fail, 0 skipped; `cw test` 6 cases passed; `cw doctor` nothing to fix; `check` and `doctor` of `sdd-specs` pass; `git diff --check` passes. The cases put to the real agent were not run: a pass on request is not held to them ([CORE-FR-047](spec-core.md#core-fr-047)).

Every violation of the pass before, by [CORE Story 23](spec-core.md#core-story-23---quality-cross-check-of-core-stories-11-and-1922-priority-p3), is fixed by [CORE Story 28](spec-core.md#core-story-28---fix-what-the-second-quality-pass-found-priority-p2) and not reported again.

### Code against the stories

- Every scenario of a `Done` story is held: **fail**
  - [CORE Story 27](spec-core.md#core-story-27---talk-to-each-developer-in-the-language-they-chose-and-write-the-documents-in-the-repositorys-priority-p2) scenario 11, that code and commit messages do not follow the document language, is held by no test, and neither its evidence (`specs/plan.json`, [CORE Story 27](spec-core.md#core-story-27---talk-to-each-developer-in-the-language-they-chose-and-write-the-documents-in-the-repositorys-priority-p2)) nor its handoff note (`specs/handoff/core-27.md:14-15`) names a run that wrote code or a commit under a non-English document language; the same holds for the first half of its scenario 10, a document written in English under a manifest with no document language — only its second half, /sdd-doctor failing nothing, is held (`.cw/charter/script/sdd-specs/specs.test.mjs:405`); [CORE-FR-065](spec-core.md#core-fr-065), [CORE-FR-066](spec-core.md#core-fr-066), [CORE-FR-011](spec-core.md#core-fr-011).
- Every test and static check passes twice, none skipped: pass
- The code of each `Done` story does what its FR say: pass
- No code does what no FR asks for: pass — warning: the skill `sdd-release` (`.claude/skills/sdd-release/SKILL.md`) is described by no FR; it is this repository's own tooling, not exported by the charter, so [CORE-FR-028](spec-core.md#core-fr-028) does not reach it.
- The code keeps the guides that apply to it: pass

### Specs against each other

- **Consistent**: pass — warning: the spec calls the developer's request to assess every file again "a rescan" throughout ([CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054)), while /sdd-code-smell and `sdd-smell` call it "a repeat scan" (`.cw/charter/skill/sdd-code-smell/index.md:21`, `:51`; `.cw/charter/script/sdd-smell/index.md:36`, `:191`).
- **Complete**: pass — warning: [CORE-SC-007](spec-core.md#core-sc-007) and [CORE-SC-008](spec-core.md#core-sc-008) are cited by no scenario.
- **No conflict**: pass
- **Roadmap**: pass
- **Format**: pass

**Grade**: F — a `Done` scenario nothing proves: [CORE Story 27](spec-core.md#core-story-27---talk-to-each-developer-in-the-language-they-chose-and-write-the-documents-in-the-repositorys-priority-p2) scenario 11 and the first half of scenario 10; one violation, three warnings.
