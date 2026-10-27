# Spec: Core — taking a story from request to Done, and leaving a state the next session can trust

**Created**: 2026-10-26

**Updated**: 2026-10-27

**Input**: User description: "Phase 1 of the charter is done. Enhance it: a review by an agent other than the author, a baseline before the first change, a handoff for a story in progress, a clean state before finishing, the evidence kept with a Done story, the runtime read while verifying, a quality grade per part, and a health check of the setup."
Then: "When planning, add a quality cross-check story after about every five stories, so the quality pass is sure to run instead of being skipped."

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
- Q: Where is the proof that a story works kept once it is `Done`? → A: briefly, in the story's entry of the roadmap ([CORE-FR-011](#core-fr-011), ADR-001).
- Q: What happens when the checks already fail before the story's first change? → A: stop and ask: fix it first through /sdd-bug-fix, or record it as a known failure and go on ([CORE-FR-003](#core-fr-003), [CORE-FR-004](#core-fr-004)).
- Q: When is the quality document updated, and who reads it? → A: in a periodic cleanup pass, not after every story; every new session reads it before picking a story ([CORE-FR-014](#core-fr-014), [CORE-FR-016](#core-fr-016)).
- Q: How is the periodic pass made sure to run? → A: /sdd-plan puts a quality cross-check story on the roadmap after every five stories, depending on them, so it is built like any other story ([CORE-FR-019](#core-fr-019), [CORE-FR-020](#core-fr-020)).

### Session 2026-10-27

- Q: Does the reviewer also hold the guides that apply to the changed files? → A: yes, so it can catch a hunk that breaks one ([CORE-FR-001](#core-fr-001)).

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

1. **Given** a verified change, **When** the review step runs, **Then** it is made by an agent spawned for it, holding only the story, the FR and SC it cites, the guides that apply to the changed files, and the change ([CORE-FR-001](#core-fr-001)).
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

**Status**: Todo

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

**Status**: Todo

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

**Status**: Todo

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

**Status**: Todo

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

### CORE Story 7 - Grade each part of the product over time (Priority: P3)

**Status**: Todo

In a periodic cleanup pass, the agent grades each spec of
the set from A to F against the same criteria, with the reason for each grade,
and keeps the grades in a quality document in the spec folder. Every new
session reads it before picking a story, and the lowest-graded part is
offered first for cleanup. So that the pass is never skipped, /sdd-plan puts a
quality cross-check story on the roadmap after every five stories it adds,
waiting on them, and it is built like any other story.

**Why this priority**: every story can pass its own review while a part
decays as a whole — a test skipped, an FR bent by a later story — and nothing
that looks at one change at a time sees it.

**Independent Test**: run the cleanup pass on a spec set where a `Done`
story's scenario has no test; its part loses a grade, the reason names the
scenario, and the next /sdd-implement mentions it.

**Acceptance Scenarios**:

1. **Given** a spec set, **When** the developer runs the quality pass, **Then** each spec gets a grade A–F on each criterion and overall, with a reason citing the stories, FR or SC behind it ([CORE-FR-014](#core-fr-014), [CORE-FR-015](#core-fr-015)).
2. **Given** an earlier quality document, **When** the pass runs again, **Then** each grade shows what it was before, so a drop can be seen ([CORE-FR-015](#core-fr-015)).
3. **Given** a quality document, **When** /sdd-implement starts, **Then** it names the lowest-graded part before the roadmap is shown ([CORE-FR-016](#core-fr-016)).
4. **Given** /sdd-plan adding twelve stories, **When** it writes the roadmap, **Then** it adds two quality cross-check stories, the first waiting on the first five stories and the second on the next five ([CORE-FR-019](#core-fr-019), [CORE-SC-005](#core-sc-005)).
5. **Given** a quality cross-check story picked by /sdd-implement, **When** it is built, **Then** it runs the quality pass, offers the lowest-graded part for cleanup, and is `Done` only once both are done ([CORE-FR-020](#core-fr-020)).

---

### CORE Story 8 - Check the spec-driven setup itself (Priority: P3)

**Status**: Todo

The developer asks whether the repository's spec-driven setup is healthy. The
agent checks that the settings point at a spec folder that exists, that the
manifest answers every question /sdd-init asks today, that the specs are
checked when the agent stops, and that the tools it runs are available, and
offers to fix each fault it finds.

**Why this priority**: a manifest written by an older version silently falls
back to defaults, and a check that is not installed passes everything.

**Independent Test**: remove an answer from the manifest and run the health
check; it names the missing answer and offers to ask it.

**Acceptance Scenarios**:

1. **Given** a set-up repository, **When** the health check runs, **Then** it reports each item as passing or failing, with the reason ([CORE-FR-017](#core-fr-017)).
2. **Given** a manifest missing an answer /sdd-init now asks, **When** it is reported, **Then** the agent offers to ask that one question and write the answer ([CORE-FR-018](#core-fr-018)).
3. **Given** a repository not set up at all, **When** the health check runs, **Then** it says so and offers /sdd-init ([CORE-FR-017](#core-fr-017)).

---

### CORE Story 9 - Quality cross-check of CORE Stories 1–8 (Priority: P3)

**Status**: Todo

The first quality cross-check: once the eight stories of this phase are
`Done`, the quality pass grades the spec set and the lowest-graded part is
offered for cleanup.

**Why this priority**: it proves the cross-check this phase adds, on the
phase that adds it.

**Independent Test**: once CORE Stories 1–8 are `Done`, build this story; a
quality document exists with a grade per criterion for CORE.

**Acceptance Scenarios**:

1. **Given** CORE Stories 1–8 `Done`, **When** this story is built, **Then** the quality document grades CORE on each criterion and overall, with reasons ([CORE-FR-014](#core-fr-014), [CORE-FR-015](#core-fr-015)).
2. **Given** that document, **When** the story finishes, **Then** the lowest-graded part has been offered for cleanup ([CORE-FR-020](#core-fr-020)).

---

### Edge Cases

- A story picked up again whose handoff note disagrees with the code — the code wins; the agent says where they differ before going on.
- Handoff notes set to be ignored — a session on another machine finds none, and starts from the story and its branch.
- A project that defines no test or static check — the baseline says so instead of passing silently, and asks whether to go on.
- A secret-like string that is a fixture or a test value — the clean-state check names it, and the developer may accept it once for that change.
- A program run by hand that writes no log — verify says nothing was logged rather than reporting a clean log.
- A spec with no `Done` story yet — the quality pass grades it `—`, not A or F.
- A quality cross-check story whose stories are split across specs — it grades every spec those stories belong to.
- A story set back from `Done` — its evidence is removed with the status.

## Requirements *(mandatory)*

### Functional Requirements

**Review**

- <a id="core-fr-001"></a>**CORE-FR-001**: The review of a change MUST be made by an agent other than the one that wrote it, starting from the story, the FR and SC it cites, the guides that apply to the changed files, and the change alone.
- <a id="core-fr-002"></a>**CORE-FR-002**: That review MUST grade each finding `bug`, `risk`, `nit` or `q`, and fail on any `bug` or `risk`.

**Baseline**

- <a id="core-fr-003"></a>**CORE-FR-003**: Before a story's or a fix's first change, the agent MUST run every test and static check the project defines and report whether they pass, or say that it defines none and ask whether to go on.
- <a id="core-fr-004"></a>**CORE-FR-004**: On a failing baseline the agent MUST stop and ask the developer to fix it first or to record it as known; a known failure MUST NOT fail the story's verify step on its own, and MUST be named at the hand-over.

**Handoff**

- <a id="core-fr-005"></a>**CORE-FR-005**: A story `In Progress` MUST have a handoff note of its own in the spec folder whenever a session stops on it.
- <a id="core-fr-006"></a>**CORE-FR-006**: A handoff note MUST say what is done, what remains, the decisions taken and what blocks the story, and nothing the spec already says.
- <a id="core-fr-007"></a>**CORE-FR-007**: /sdd-init MUST ask whether handoff notes are committed or ignored, and record the answer in the manifest.
- <a id="core-fr-008"></a>**CORE-FR-008**: /sdd-implement MUST read a story's handoff note before working on it again, and say where the note and the code differ, the code winning.
- <a id="core-fr-009"></a>**CORE-FR-009**: A story's handoff note MUST be removed when the story is set to `Done`.

**Clean state**

- <a id="core-fr-010"></a>**CORE-FR-010**: /sdd-finish MUST refuse to land a story or a fix while its change holds a stray or temporary file, debug output, a leftover marker, a secret, or a handoff note of a `Done` story, naming each; a finding the developer accepts for that change no longer blocks it.

**Evidence**

- <a id="core-fr-011"></a>**CORE-FR-011**: When a story is set to `Done`, its roadmap entry MUST get a one-line summary of the evidence that proved it and the date it was produced.
- <a id="core-fr-012"></a>**CORE-FR-012**: Checking the spec set MUST accept evidence on a `Done` story's roadmap entry and fail on evidence for a story that is not `Done`; a story set back from `Done` loses its evidence.

**Runtime**

- <a id="core-fr-013"></a>**CORE-FR-013**: /sdd-verify MUST read what the program logs and prints during the manual run, and fail on an error or warning raised on the story's path, quoting it; when nothing was logged it MUST say so.

**Quality**

- <a id="core-fr-014"></a>**CORE-FR-014**: A quality pass MUST grade each spec A–F on verification passing, agent understandability, test stability, boundaries kept and conventions followed, and overall; a spec with no `Done` story is graded `—`.
- <a id="core-fr-015"></a>**CORE-FR-015**: Each grade MUST carry its reason, citing the stories, FR or SC behind it, and the grade the previous pass gave.
- <a id="core-fr-016"></a>**CORE-FR-016**: /sdd-implement MUST name the lowest-graded part, when there is a quality document, before it shows the roadmap.
- <a id="core-fr-019"></a>**CORE-FR-019**: /sdd-plan MUST add a quality cross-check story after every five stories it adds — the number the manifest names, where it names one — depending on those stories, and carry the stories left over to the next phase's count.
- <a id="core-fr-020"></a>**CORE-FR-020**: A quality cross-check story MUST run the quality pass and offer the lowest-graded part for cleanup, and MUST NOT be set to `Done` before both are done.

**Health**

- <a id="core-fr-017"></a>**CORE-FR-017**: A health check MUST report whether the settings, the spec folder, every answer of the manifest, the check on stop and the tools it needs are in place, each with its reason.
- <a id="core-fr-018"></a>**CORE-FR-018**: For each fault, the health check MUST offer the fix: the one question to ask, or /sdd-init.

### Key Entities

- **Handoff note**: where a story in progress stands — done, remaining, decisions, blockers. One per story, alive while the story is `In Progress`.
- **Evidence**: a one-line summary of what proved a `Done` story and when; part of the story's roadmap entry.
- **Quality document**: one grade per spec per criterion, with reasons and the previous grade; rewritten by each quality pass.

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
- Grading the code outside what the spec set describes.
