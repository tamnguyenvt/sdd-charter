# Spec: Core — taking a story from request to Done, and leaving a state the next session can trust

**Created**: 2026-10-26

**Updated**: 2026-10-28

**Input**: User description: "Phase 1 of the charter is done. Enhance it: a review by an agent other than the author, a baseline before the first change, a handoff for a story in progress, a clean state before finishing, the evidence kept with a Done story, the runtime read while verifying, a quality grade per part, and a health check of the setup."
Then: "When planning, add a quality cross-check story after about every five stories, so the quality pass is sure to run instead of being skipped."
Then: "Let the review see what verify proved: calling the review verifies too, so a scenario only a manual run can prove no longer comes back as a question."
Then: "A quality pass checks the whole codebase against the stories written, and the specs against each other — consistent, complete, with no conflict — from a checklist in quality.md that /sdd-init writes from a template; one overall grade; its report goes at the end of quality.md, to be read again any time, and what it finds becomes stories through /sdd-plan."
Then: "Fix what the first quality pass found, as one story."

## Overview

This project was split from Cherry Works to build one charter for
spec-driven development that is reused across projects: installed into a
repository, it lets a coding agent take a story of a spec set from request to
`Done`, stopping for the user's yes at each gate, and land the work the way
the repository's manifest says. Phase 1 — the spec set, the roadmap, the
manifest, planning, implementing, fixing a bug, finishing, reviewing,
verifying and reporting — is done.

This phase makes that walk trustworthy across sessions: the code is checked by
someone other than its author, the agent knows the repository was healthy
before it touched it, work survives the end of a session, nothing is left
behind when a story lands, the proof that a story works is kept, and the
health of each part is graded on a regular beat so the next session knows
where to clean first. It serves the developers who run the charter's commands
and the agents that walk them.

## Clarifications

### Session 2026-10-26

- Q: Where does the handoff note of a story in progress live, and is it committed? → A: in the spec folder, one note per story in a folder of its own; /sdd-init asks whether those notes are committed or ignored ([CORE-FR-005](#core-fr-005), [CORE-FR-007](#core-fr-007)).
- Q: Where is the proof that a story works kept once it is `Done`? → A: briefly, in the story's entry of the roadmap ([CORE-FR-011](#core-fr-011)).
- Q: What happens when the checks already fail before the story's first change? → A: stop and ask: fix it first through /sdd-bug-fix, or record it as a known failure and go on ([CORE-FR-003](#core-fr-003), [CORE-FR-004](#core-fr-004)).
- Q: When does a quality pass run, and where does what it finds go? → A: in a quality cross-check story, not after every story; its report goes at the end of the quality document, and each violation becomes a story ([CORE-FR-015](#core-fr-015), [CORE-FR-020](#core-fr-020)).
- Q: How is the quality pass made sure to run? → A: /sdd-plan puts a quality cross-check story on the roadmap after every five stories, depending on them, so it is built like any other story ([CORE-FR-019](#core-fr-019), [CORE-FR-020](#core-fr-020)).

### Session 2026-10-27

- Q: Does the reviewer also hold the guides that apply to the changed files? → A: yes, so it can catch a hunk that breaks one ([CORE-FR-001](#core-fr-001)).
- Q: Is the story that lets the review see what verify proved graded by the first quality cross-check? → A: yes, it comes before it and the cross-check depends on it ([CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3), [CORE Story 10](#core-story-10---review-with-the-proof-verify-produced-priority-p2)).
- Q: A scenario proven neither by a test nor by the line verify ended on — does the review fail or only ask? → A: it fails: nothing proves it ([CORE-FR-022](#core-fr-022)).
- Q: Does the health check also check the check on stop and the tools it runs? → A: no: it checks the spec set's setup alone; the engine's health is `cw doctor`'s ([CORE-FR-017](#core-fr-017)).
- Q: Is the pass that grades the specs called one name throughout? → A: yes, the quality pass ([CORE-FR-014](#core-fr-014)).
- Q: Are the findings picked from the cleanup [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) offers fixed in that story, or each in a change of its own? → A: in that story: all four, the evidence of CORE Stories 1–3 included ([CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) scenario 3).
- Q: Must a quality cross-check whose stories belong to several specs check each of them? → A: yes: every pass checks every spec of the set ([CORE-FR-024](#core-fr-024)).
- Q: What does the quality pass check? → A: the whole codebase against every story written, and the specs against each other — consistent, complete, with no conflict — item by item against a checklist ([CORE-FR-014](#core-fr-014)).
- Q: Where is that checklist kept? → A: in the quality document in the spec folder, written from its template by /sdd-init, or by a pass that finds none ([CORE-FR-025](#core-fr-025)).
- Q: Is each spec graded on its own? → A: no: one overall grade for the product, from the checklist ([CORE-FR-014](#core-fr-014)).
- Q: Where does a pass's report go? → A: in a section of its own at the end of the quality document, rewritten by each pass, so it can be read again any time; the checklist above it is left as it is ([CORE-FR-015](#core-fr-015)).
- Q: Does a cross-check story fix what its pass finds? → A: no: /sdd-plan turns each violation into a story to fix it; the four findings of the pass [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) ran before the checklist existed are fixed in [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) ([CORE-FR-020](#core-fr-020)).
- Q: Does /sdd-implement still name the lowest-graded part before the roadmap? → A: no: no part is graded on its own any more, and the violations are stories on the roadmap; `CORE-FR-016` is dropped.

### Session 2026-10-28

- Q: Are the violations the first quality pass found fixed in one story or several? → A: one, [CORE Story 11](#core-story-11---fix-what-the-first-quality-pass-found-priority-p2) ([CORE-FR-020](#core-fr-020)).
- Q: Does the checklist hold the code to the guides that apply to it? → A: yes: the pass checks the code against the stories and those guides, and nothing else ([CORE-FR-014](#core-fr-014)).

## User Scenarios & Testing *(mandatory)*

### CORE Story 1 - Review by an agent that did not write the change (Priority: P1)

**Status**: Done

A developer runs /sdd-implement. Once the change is verified, it is reviewed
by an agent that starts with a clean context — the story, its FR and SC, the
guides that apply, and the change, nothing of how the change was arrived
at — and the developer gets its graded findings.

**Why this priority**: a model grading its own work passes what it meant to
write rather than what it wrote; every later story is only as sound as its
review.

**Independent Test**: run /sdd-implement on a story whose change misses a
scenario; the review, made by a separate agent, reports the miss.

**Acceptance Scenarios**:

1. **Given** a verified change, **When** the review step runs, **Then** it is made by an agent spawned for it, holding only the story, the FR and SC it cites, the guides that apply to the changed files, the change, and the line its verify ended on ([CORE-FR-001](#core-fr-001)).
2. **Given** that review, **When** it finishes, **Then** the walk receives each finding graded `bug`, `risk`, `nit` or `q`, and a `bug` or `risk` fails the review as before ([CORE-FR-002](#core-fr-002)).

---

### CORE Story 2 - Check the baseline before the first change (Priority: P1)

**Status**: Done

Before a story's first change, the agent runs the tests and static checks the
project defines. When they pass, it goes on; when they fail, it stops and asks
the developer what to do.

**Why this priority**: a failure that was there before the story is otherwise
blamed on it, and the story's verify step cannot tell the two apart.

**Independent Test**: break a test on the development branch, then run
/sdd-implement; it stops before changing anything and names the failure.

**Acceptance Scenarios**:

1. **Given** a story just opened, **When** no change has been made yet, **Then** the agent runs every test and static check the project defines and reports whether they pass ([CORE-FR-003](#core-fr-003)).
2. **Given** a failing baseline, **When** it is reported, **Then** the agent stops and offers to fix it first through /sdd-bug-fix or to record it as a known failure and go on ([CORE-FR-004](#core-fr-004)).
3. **Given** a failure recorded as known, **When** the story is verified, **Then** that failure alone does not fail the verify step, and the hand-over names it ([CORE-FR-004](#core-fr-004), [CORE-SC-004](#core-sc-004)).

---

### CORE Story 3 - Hand a story in progress over to the next session (Priority: P1)

**Status**: Done

When a session ends with a story still `In Progress`, it leaves a handoff note
for that story: what is done, what remains, the decisions taken, and what
blocks it. A later session that picks the story up reads the note first.

**Why this priority**: a story that outlives one session otherwise restarts
from the chat it lost, and redoes or contradicts decisions already accepted.

**Independent Test**: start a story, end the session midway, open a new one
and ask to implement; it resumes from the note without asking again what was
already decided.

**Acceptance Scenarios**:

1. **Given** a story `In Progress`, **When** the session stops, **Then** the story's handoff note holds what is done, what remains, the decisions taken and what blocks it ([CORE-FR-005](#core-fr-005), [CORE-FR-006](#core-fr-006)).
2. **Given** a story with a handoff note, **When** /sdd-implement picks it up, **Then** the note is read before anything else of the story is done ([CORE-FR-008](#core-fr-008), [CORE-SC-001](#core-sc-001)).
3. **Given** /sdd-init, **When** it asks how work is carried out, **Then** it asks whether handoff notes are committed or ignored, and writes the answer to the manifest ([CORE-FR-007](#core-fr-007)).
4. **Given** a story set to `Done`, **When** it is finished, **Then** its handoff note is gone ([CORE-FR-009](#core-fr-009)).

---

### CORE Story 4 - Refuse to finish on an unclean state (Priority: P2)

**Status**: Done

Before /sdd-finish lands a story or a fix, it checks that nothing is left
behind: no stray or temporary files, no debug output or leftover markers
added by the change, no secret, and no handoff note of a `Done` story. It
refuses to land, naming what is left, until the state is clean.

**Why this priority**: what is left behind "for later" is never cleaned, and
the next session starts on the mess.

**Independent Test**: leave a temporary file and a debug print in a story's
change, then finish it; /sdd-finish refuses and names both.

**Acceptance Scenarios**:

1. **Given** a story ready to land, **When** /sdd-finish runs, **Then** it checks the change for stray files, debug output, leftover markers and secrets before landing ([CORE-FR-010](#core-fr-010)).
2. **Given** a check that finds something, **When** it reports, **Then** nothing lands and each finding is named by where it is ([CORE-FR-010](#core-fr-010)).
3. **Given** a clean state, **When** /sdd-finish runs twice, **Then** the check passes both times with the same result ([CORE-SC-002](#core-sc-002)).

---

### CORE Story 5 - Keep the proof that a story works (Priority: P2)

**Status**: Done

When a story is set to `Done`, its entry in the roadmap gets a short line of
evidence — what was run and what it showed — and the date, so anyone can see
later what proved it without the session that did.

**Why this priority**: evidence produced in a session is lost with it; a
`Done` that cannot say why is a claim, not a fact.

**Independent Test**: finish a story; its roadmap entry holds the evidence and
the date, and the roadmap still checks.

**Acceptance Scenarios**:

1. **Given** a story set to `Done`, **When** it is marked, **Then** its roadmap entry holds a one-line summary of the evidence /sdd-verify produced and the date it was produced ([CORE-FR-011](#core-fr-011), [CORE-SC-003](#core-sc-003)).
2. **Given** a roadmap with evidence on some entries, **When** the spec set is checked, **Then** it passes, and an entry with evidence for a story not `Done` fails ([CORE-FR-012](#core-fr-012)).

---

### CORE Story 6 - Read the runtime while verifying (Priority: P2)

**Status**: Done

When /sdd-verify runs the story by hand, it also reads what the running
program says — its log, its console, its error output — and treats an error
or warning raised by the story's path as a failure.

**Why this priority**: a page that renders while its console throws, or a
command that exits zero after logging an error, passes a check that only
looks at the result.

**Independent Test**: make a change whose manual run succeeds but logs an
error; /sdd-verify reports the error and fails.

**Acceptance Scenarios**:

1. **Given** a manual run of the story, **When** it completes, **Then** /sdd-verify reports what the program logged and printed during it ([CORE-FR-013](#core-fr-013)).
2. **Given** an error or a warning raised on the story's path, **When** verify reports, **Then** it fails, quoting the line ([CORE-FR-013](#core-fr-013)).

---

### CORE Story 7 - Check the product against its stories over time (Priority: P3)

**Status**: Done

In a quality pass, the agent checks the whole codebase against every story
the spec set holds, and the specs against each other, item by item against a
checklist kept in a quality document in the spec folder, and gives the product
one grade from A to F. Each violation it finds is named with the stories, FR or
SC behind it, and becomes a story that fixes it through /sdd-plan. So that the
pass is never skipped, /sdd-plan puts a quality cross-check story on the
roadmap after every five stories it adds, waiting on them, and it is built like
any other story.

**Why this priority**: every story can pass its own review while the product
decays as a whole — a test skipped, an FR bent by a later story, two specs
written apart that contradict each other — and nothing that looks at one change
at a time sees it.

**Independent Test**: run the quality pass on a spec set where a `Done`
story's scenario has no test and two FR contradict each other; both items of
the checklist fail, each naming what is behind it, and each becomes a story
/sdd-plan adds.

**Acceptance Scenarios**:

1. **Given** a spec set and the checklist of its quality document, **When** the developer runs the quality pass, **Then** each item of the checklist passes or fails across the whole codebase and every spec, each failure naming its violation and citing the stories, FR or SC behind it, with one overall grade A–F ([CORE-FR-014](#core-fr-014), [CORE-FR-015](#core-fr-015)).
2. **Given** a quality pass, **When** it ends, **Then** its report is the last section of the quality document, in place of the report of the pass before, and the checklist above it is unchanged ([CORE-FR-015](#core-fr-015)).
3. **Given** a spec set /sdd-init writes, or a spec folder with no quality document, **When** /sdd-init or the pass runs, **Then** the quality document holds the checklist of its template ([CORE-FR-025](#core-fr-025)).
4. **Given** /sdd-plan adding twelve stories, **When** it writes the roadmap, **Then** it adds two quality cross-check stories, the first waiting on the first five stories and the second on the next five ([CORE-FR-019](#core-fr-019), [CORE-SC-005](#core-sc-005)).
5. **Given** a quality cross-check story picked by /sdd-implement, **When** it is built, **Then** the violations its pass reports go to /sdd-plan as stories that fix them, it fixes none itself, and it is `Done` only once the developer has accepted those stories, or the pass found none ([CORE-FR-020](#core-fr-020)).
6. **Given** a quality cross-check story waiting on stories of one spec, **When** it is built, **Then** its pass checks every spec of the set ([CORE-FR-024](#core-fr-024)).

---

### CORE Story 8 - Check the spec-driven setup itself (Priority: P3)

**Status**: Done

The developer asks whether the repository's spec-driven setup is healthy. The
agent checks that the settings point at a spec folder that exists and that
the manifest answers every question /sdd-init asks today, and offers to fix
each fault it finds. The engine's own health — the check on stop, the build,
the tools — is `cw doctor`'s, not this one's.

**Why this priority**: a manifest written by an older version silently falls
back to defaults.

**Independent Test**: remove an answer from the manifest and run the health
check; it names the missing answer and offers to ask it.

**Acceptance Scenarios**:

1. **Given** a set-up repository, **When** the health check runs, **Then** it reports each item as passing or failing, with the reason ([CORE-FR-017](#core-fr-017)).
2. **Given** a manifest missing an answer /sdd-init now asks, **When** it is reported, **Then** the agent offers to ask that one question and write the answer ([CORE-FR-018](#core-fr-018)).
3. **Given** a repository not set up at all, **When** the health check runs, **Then** it says so and offers /sdd-init ([CORE-FR-017](#core-fr-017)).

---

### CORE Story 9 - Quality cross-check of CORE Stories 1–8 and 10 (Priority: P3)

**Status**: Done

The first quality cross-check: once the other nine stories of this phase are
`Done`, it makes the quality pass what [CORE Story 7](#core-story-7---check-the-product-against-its-stories-over-time-priority-p3) now describes, runs it, and
hands what it finds to /sdd-plan. The four findings of the pass it ran before
the checklist existed are fixed in it.

**Why this priority**: it proves the cross-check this phase adds, on the
phase that adds it.

**Independent Test**: once CORE Stories 1–8 and 10 are `Done`, build this
story; the quality document holds the checklist and, at its end, the report;
each violation it names is a story on the roadmap.

**Acceptance Scenarios**:

1. **Given** CORE Stories 1–8 and 10 `Done`, **When** this story is built, **Then** the quality pass checks the code and every spec against the checklist, and reports each item and one overall grade at the end of the quality document ([CORE-FR-014](#core-fr-014), [CORE-FR-015](#core-fr-015), [CORE-FR-025](#core-fr-025)).
2. **Given** that report, **When** the story finishes, **Then** each violation it names is a story /sdd-plan added and the developer accepted, or it names none ([CORE-FR-020](#core-fr-020)).
3. **Given** the four findings picked from the pass run before the checklist, **When** the story finishes, **Then** each one is fixed in this story and proven, and each of CORE Stories 1–3 has evidence in the roadmap ([CORE-FR-011](#core-fr-011)).

---

### CORE Story 10 - Review with the proof verify produced (Priority: P2)

**Status**: Done

A developer runs /sdd-implement or /sdd-bug-fix. Verifying and reviewing are
one step: the review verifies the change first, stops on a failure, and hands
the reviewing agent the line verify ended on with the change. A scenario no
automated test can hold — one proven by a run by hand — counts as proven by
that line, so the review no longer asks what the walk has already shown.

**Why this priority**: a review that holds only the change asks about every
scenario proven by hand, and the developer answers at the gate what verify
already showed.

**Independent Test**: build a change whose scenario only a run by hand can
prove; the review accepts the run verify reported and asks nothing about it;
with no such run reported, the review fails on that scenario.

**Acceptance Scenarios**:

1. **Given** a change, **When** the review step runs, **Then** it verifies the change first, and a failing verify stops the step before any review is made ([CORE-FR-021](#core-fr-021)).
2. **Given** a passed verify, **When** the reviewing agent starts, **Then** it holds the line verify ended on beside the story, its FR and SC, the guides and the change, and nothing else ([CORE-FR-001](#core-fr-001)).
3. **Given** a scenario no test holds, **When** the line verify ended on proves it, **Then** the review counts it proven; **When** it does not, **Then** the review fails on it ([CORE-FR-022](#core-fr-022)).
4. **Given** a check failing during verify, **When** verify reports, **Then** it changes nothing itself, and the walk goes back to the change ([CORE-FR-023](#core-fr-023)).

---

### CORE Story 11 - Fix what the first quality pass found (Priority: P2)

**Status**: Todo

The first quality pass, run by [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3), failed six items of the
checklist. This story fixes each violation it named, so that the next pass
finds them passing.

**Why this priority**: a `Done` story nothing proves is a claim, and specs that
contradict each other mislead every story built on them.

**Independent Test**: run the quality pass once this story is `Done`; none of
the violations the pass of [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) named is reported again.

**Acceptance Scenarios**:

1. **Given** [CORE Story 4](#core-story-4---refuse-to-finish-on-an-unclean-state-priority-p2) and [CORE Story 10](#core-story-10---review-with-the-proof-verify-produced-priority-p2) scenario 3, **When** this story is `Done`, **Then** each of their scenarios is held by a test that would fail without it, or by a run their evidence names ([CORE-FR-011](#core-fr-011), [CORE-FR-022](#core-fr-022)).
2. **Given** a bug fix whose baseline recorded a known failure, **When** /sdd-bug-fix hands it over, **Then** it hands it over under the same rules as /sdd-implement and names that failure ([CORE-FR-004](#core-fr-004)).
3. **Given** a change with more findings than 128 KB of output holds, **When** the clean-state check writes them into a pipe, **Then** every finding is written ([CORE-FR-010](#core-fr-010)).
4. **Given** the commands the first phase built, **When** the quality pass checks the code against the stories, **Then** each is described by a `Done` story and the FR it cites ([CORE-FR-028](#core-fr-028)).
5. **Given** the checklist's item on the guides, **When** the spec is checked, **Then** its out of scope agrees that the code is checked against the stories and the guides that apply to it ([CORE-FR-014](#core-fr-014)).
6. **Given** handoff notes set to be ignored and a story `In Progress` with no note, **When** /sdd-implement picks it, **Then** it starts from the story and its branch ([CORE-FR-026](#core-fr-026)).
7. **Given** a spec with no `Done` story, **When** the quality pass runs, **Then** it checks that spec against the other specs and no code against it ([CORE-FR-027](#core-fr-027)).
8. **Given** this spec and the index, **When** the next quality pass runs, **Then** "health" names the setup check alone, the Overview gives the product one grade, every mention of how often a cross-check comes takes the manifest's number, and the index names the quality document ([CORE-FR-019](#core-fr-019), [CORE-SC-005](#core-sc-005)).

---

### Edge Cases

- A story picked up again whose handoff note disagrees with the code — the code wins; the agent says where they differ before going on.
- Handoff notes set to be ignored — a session on another machine finds none, and starts from the story and its branch ([CORE-FR-026](#core-fr-026)).
- A project that defines no test or static check — the baseline says so instead of passing silently, and asks whether to go on.
- A secret-like string that is a fixture or a test value — the clean-state check names it, and the developer may accept it once for that change.
- A program run by hand that writes no log — verify says nothing was logged rather than reporting a clean log.
- A spec with no `Done` story yet — no code is checked against it, and it is still checked against the other specs ([CORE-FR-027](#core-fr-027)).
- A quality cross-check story whose stories are split across specs — its pass checks every spec of the set, as every pass does ([CORE-FR-024](#core-fr-024)).
- A story set back from `Done` — its evidence is removed with the status.

## Requirements *(mandatory)*

### Functional Requirements

**Review**

- <a id="core-fr-001"></a>**CORE-FR-001**: The review of a change MUST be made by an agent other than the one that wrote it, starting from the story, the FR and SC it cites, the guides that apply to the changed files, the change and the line its verify ended on, and nothing else.
- <a id="core-fr-002"></a>**CORE-FR-002**: That review MUST grade each finding `bug`, `risk`, `nit` or `q`, and fail on any `bug` or `risk`.
- <a id="core-fr-021"></a>**CORE-FR-021**: The review step MUST verify the change first, and stop before any review is made when verify fails.
- <a id="core-fr-022"></a>**CORE-FR-022**: The review MUST count a scenario proven by a test that would fail without it or by the line verify ended on, and fail on a scenario proven by neither.
- <a id="core-fr-023"></a>**CORE-FR-023**: Verify MUST report a failing check without changing anything itself; the walk goes back to the change.

**Baseline**

- <a id="core-fr-003"></a>**CORE-FR-003**: Before a story's or a fix's first change, the agent MUST run every test and static check the project defines and report whether they pass, or say that it defines none and ask whether to go on.
- <a id="core-fr-004"></a>**CORE-FR-004**: On a failing baseline the agent MUST stop and ask the developer to fix it first or to record it as known; a known failure MUST NOT fail the story's verify step on its own, and MUST be named at the hand-over.

**Handoff**

- <a id="core-fr-005"></a>**CORE-FR-005**: A story `In Progress` MUST have a handoff note of its own in the spec folder whenever a session stops on it.
- <a id="core-fr-006"></a>**CORE-FR-006**: A handoff note MUST say what is done, what remains, the decisions taken and what blocks the story, and nothing the spec already says.
- <a id="core-fr-007"></a>**CORE-FR-007**: /sdd-init MUST ask whether handoff notes are committed or ignored, and record the answer in the manifest.
- <a id="core-fr-008"></a>**CORE-FR-008**: /sdd-implement MUST read a story's handoff note before working on it again, and say where the note and the code differ, the code winning.
- <a id="core-fr-009"></a>**CORE-FR-009**: A story's handoff note MUST be removed when the story is set to `Done`.
- <a id="core-fr-026"></a>**CORE-FR-026**: Where handoff notes are ignored, /sdd-implement MUST start a story `In Progress` that has no note from the story and its branch.

**Clean state**

- <a id="core-fr-010"></a>**CORE-FR-010**: /sdd-finish MUST refuse to land a story or a fix while its change holds a stray or temporary file, debug output, a leftover marker, a secret, or a handoff note of a `Done` story, naming each; a finding the developer accepts for that change no longer blocks it.

**Evidence**

- <a id="core-fr-011"></a>**CORE-FR-011**: When a story is set to `Done`, its roadmap entry MUST get a one-line summary of the evidence that proved it and the date it was produced.
- <a id="core-fr-012"></a>**CORE-FR-012**: Checking the spec set MUST accept evidence on a `Done` story's roadmap entry and fail on evidence for a story that is not `Done`; a story set back from `Done` loses its evidence.

**Runtime**

- <a id="core-fr-013"></a>**CORE-FR-013**: /sdd-verify MUST read what the program logs and prints during the manual run, and fail on an error or warning raised on the story's path, quoting it; when nothing was logged it MUST say so.

**Quality**

- <a id="core-fr-014"></a>**CORE-FR-014**: A quality pass MUST check the whole codebase against every story the spec set holds, and the specs against each other — consistent, complete, and with no conflict — item by item against the checklist of the quality document, and give the product one overall grade A–F.
- <a id="core-fr-015"></a>**CORE-FR-015**: Each item that fails MUST name its violation, citing the stories, FR or SC behind it; the report of a pass — each item and the grade — MUST go at the end of the quality document, in place of the report of the pass before, leaving the checklist as it is.
- <a id="core-fr-019"></a>**CORE-FR-019**: /sdd-plan MUST add a quality cross-check story after every five stories it adds — the number the manifest names, where it names one — depending on those stories, and carry the stories left over to the next phase's count.
- <a id="core-fr-020"></a>**CORE-FR-020**: A quality cross-check story MUST run the quality pass and hand the violations it reports to /sdd-plan, which adds a story to fix each; it fixes nothing itself — but for [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3), which fixes the four findings of the pass it ran before the quality document held a checklist — and MUST NOT be set to `Done` before the developer has accepted those stories, or the pass found none.
- <a id="core-fr-024"></a>**CORE-FR-024**: A quality pass MUST check every spec of the set, whichever stories the cross-check waits on.
- <a id="core-fr-025"></a>**CORE-FR-025**: The quality document MUST hold the checklist the quality pass checks against: /sdd-init writes it from its template, the project may edit it, and a pass that finds none writes it the same way first.
- <a id="core-fr-027"></a>**CORE-FR-027**: A quality pass MUST check a spec with no `Done` story against the other specs, and no code against it.

**Health**

- <a id="core-fr-017"></a>**CORE-FR-017**: A health check MUST report whether the settings, the spec folder and every answer of the manifest are in place, each with its reason; it checks nothing of the engine — the check on stop, the build, the tools.
- <a id="core-fr-018"></a>**CORE-FR-018**: For each fault, the health check MUST offer the fix: the one question to ask, or /sdd-init.

**Coverage**

- <a id="core-fr-028"></a>**CORE-FR-028**: Every command the charter offers MUST be described by a `Done` story of the spec set and the FR it cites.

### Key Entities

- **Handoff note**: where a story in progress stands — done, remaining, decisions, blockers. One per story, alive while the story is `In Progress`.
- **Evidence**: a one-line summary of what proved a `Done` story and when; part of the story's roadmap entry.
- **Quality document**: the checklist a quality pass checks the code and the specs against, written from its template and kept and edited by the project, followed by the report of the last pass.
- **Quality report**: each item of the checklist passed or failed, with its violations, and the overall grade; the last section of the quality document, rewritten by each pass.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- <a id="core-sc-001"></a>**CORE-SC-001**: A story resumed in a new session asks the developer no question already answered in the session before it.
- <a id="core-sc-002"></a>**CORE-SC-002**: Every check this spec adds gives the same result run twice on the same state, and changes nothing it checks.
- <a id="core-sc-003"></a>**CORE-SC-003**: Every `Done` story landed after this phase carries evidence in the roadmap.
- <a id="core-sc-004"></a>**CORE-SC-004**: A failure present before a story started is never reported as caused by it.
- <a id="core-sc-005"></a>**CORE-SC-005**: Once this phase is done, no more than five stories in a row land without a quality pass between them.

## Assumptions

- A handoff note is removed when its story is `Done`, whether notes are committed or ignored.
- An existing manifest without the handoff answer is read as "committed".
- The health check runs when the developer asks. The quality pass runs in each quality cross-check story, and whenever the developer asks.
- A phase that adds fewer than five stories adds no quality cross-check story; its stories count toward the next.

## Out of Scope

- Benchmarks and structured logging of the product: they belong to a product, not to the charter.
- Running the quality pass on a schedule; the developer may schedule it themselves.
- Judging the style of code no story describes: the pass checks the code only against the stories.
