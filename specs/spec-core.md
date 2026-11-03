# Spec: Core — taking a story from request to Done, and leaving a state the next session can trust

**Created**: 2026-10-26

**Updated**: 2026-11-03

**Input**: User description: "Phase 1 of the charter is done. Enhance it: a review by an agent other than the author, a baseline before the first change, a handoff for a story in progress, a clean state before finishing, the evidence kept with a Done story, the runtime read while verifying, a quality grade per part, and a health check of the setup."
Then: "When planning, add a quality cross-check story after about every five stories, so the quality pass is sure to run instead of being skipped."
Then: "Let the review see what verify proved: calling the review verifies too, so a scenario only a manual run can prove no longer comes back as a question."
Then: "A quality pass checks the whole codebase against the stories written, and the specs against each other — consistent, complete, with no conflict — from a checklist in quality.md that /sdd-init writes from a template; one overall grade; its report goes at the end of quality.md, to be read again any time, and what it finds becomes stories through /sdd-plan."
Then: "Fix what the first quality pass found, as one story."
Then: "Give every skill the voice too, so each reports in the right language."
Then: "Always talk in my language, and give each question its context: what you were doing, the problem you met, then the fix you propose."
Then: "Answer in my language even after a slash command, and propose before asking. Let /sdd-init ask whether the review is strict or quick: quick leaves each nit to the handoff note, settles a small q itself, writing what it settles to the handoff note and not to the chat. And stop removing the handoff note at Done."
Then: "In short mode, say nothing for a step that passes: only a failure, a warning or a question."
Then: "Pin the reviewing agent to the opus model."
Then: "End the hand-over on `approve ?`."
Then: "A bug fix is a task too: it keeps a handoff note."
Then: "The checks you ran by hand to prove the charter right are not yet cases cw eval can run: write them."
Then: "Write a refactor walk that checks the whole source code against the rules: the rules forbid touching lines a task does not concern, so the lines that were wrong in an existing repository are otherwise never fixed. Keep the quality pass as it is; make it /sdd-code-smell, run by hand: a snapshot of the files with a hash each, assessed file by file with a history kept, reported for review where findings can be skipped, then planned through /sdd-plan; a file whose hash is unchanged is not assessed again unless a rescan is asked for; /sdd-report shows the record."
Then: "Ask each developer at /sdd-init which language to talk to them in, kept on their machine and ignored by git, loaded on every walk; with none chosen, the voice as it is. The documents the walks write follow a language of their own, a manifest answer: two languages, the chat's and the documents'."

## Overview

This project was split from Cherry Works to build one charter for
spec-driven development that is reused across projects: installed into a
repository, it lets a coding agent take a story of a spec set from request to
`Done`, stopping for the user's yes at each gate, and land the work the way
the repository's manifest says. Phase 1 — the spec set, the roadmap, the
manifest, planning, implementing, fixing a bug, finishing, reviewing,
verifying and reporting — is done, described by CORE Stories 12–18.

This phase makes that walk trustworthy across sessions: the code is checked by
someone other than its author, the agent knows the checks passed before it
touched the repository, work survives the end of a session, nothing is left
behind when a story lands, the proof that a story works is kept, and the whole
product is checked against its stories on a regular beat and given one grade,
what it finds becoming stories on the roadmap. It serves the developers who
run the charter's commands and the agents that walk them.

A change touches only what its task concerns, so a line that broke the rules
before the charter came, or before a rule was new, is never fixed by the work
of a story or a bug. /sdd-code-smell is the walk that goes looking for those
lines: started by hand on a product the charter was not applied to before, or
under a new charter, it assesses the code file by file against the coding
rules, and what the developer agrees to becomes refactoring on the roadmap.

Two languages are kept apart: the one the agent talks to a developer in,
chosen by each developer at /sdd-init and kept on their machine alone, and the
one the walks write the repository's documents in, an answer of the manifest
the whole repository shares.

## Clarifications

### Session 2026-10-26

- Q: Where does the handoff note of a story in progress live, and is it committed? → A: in the spec folder, one note per story in a folder of its own; /sdd-init asks whether those notes are committed or ignored ([CORE-FR-005](#core-fr-005), [CORE-FR-007](#core-fr-007)).
- Q: Where is the proof that a story works kept once it is `Done`? → A: briefly, in the story's entry of the roadmap ([CORE-FR-011](#core-fr-011)).
- Q: What happens when the checks already fail before the story's first change? → A: stop and ask: fix it first through /sdd-bug-fix, or record it as a known failure and go on ([CORE-FR-003](#core-fr-003), [CORE-FR-004](#core-fr-004)).
- Q: When does a quality pass run, and where does what it finds go? → A: in a quality cross-check story, not after every story; its report goes at the end of the quality document, and each violation becomes a story ([CORE-FR-015](#core-fr-015), [CORE-FR-020](#core-fr-020)).
- Q: How is the quality pass made sure to run? → A: /sdd-plan puts a quality cross-check story on the roadmap after every five stories — the number the manifest names, where it names one — depending on them, so it is built like any other story ([CORE-FR-019](#core-fr-019), [CORE-FR-020](#core-fr-020)).

### Session 2026-10-27

- Q: Does the reviewer also hold the guides that apply to the changed files? → A: yes, so it can catch a hunk that breaks one ([CORE-FR-001](#core-fr-001)).
- Q: Is the story that lets the review see what verify proved graded by the first quality cross-check? → A: yes, it comes before it and the cross-check depends on it ([CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3), [CORE Story 10](#core-story-10---review-with-the-proof-verify-produced-priority-p2)).
- Q: A scenario proven neither by a test nor by the line verify ended on — does the review fail or only ask? → A: it fails: nothing proves it ([CORE-FR-022](#core-fr-022)).
- Q: Does the health check also check the check on stop and the tools it runs? → A: no: it checks the spec set's setup alone; the engine is `cw doctor`'s to check ([CORE-FR-017](#core-fr-017)).
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
- Q: Where are the commands phase 1 built described? → A: as `Done` stories of this spec, [CORE Story 12](#core-story-12---set-a-repository-up-for-spec-driven-development-priority-p1) on, with the FR they cite ([CORE-FR-028](#core-fr-028)).
- Q: Is giving every skill the voice of the walks part of this story? → A: yes, written into it, not a change of its own ([CORE-FR-044](#core-fr-044)).
- Q: What does a hand-over say, from /sdd-implement and /sdd-bug-fix alike? → A: each `nit` and `q`, each known failure the baseline recorded, then one line: `approve ?` ([CORE-FR-044](#core-fr-044)).
- Q: Where do the `nit` a quick review leaves and the decisions the agent takes itself go? → A: into the story's handoff note alone, never the chat ([CORE-FR-046](#core-fr-046)).
- Q: Is a story's handoff note removed when the story is `Done`? → A: no: it stays, committed or ignored as the manifest says; a project that wants its notes kept commits them ([CORE-FR-009](#core-fr-009)).
- Q: When is a `q` small enough for a quick review to settle without the developer? → A: when its answer changes no FR, scenario or out of scope, and touches only the files the story changed; any other `q` is asked ([CORE-FR-046](#core-fr-046)).
- Q: Which model does the reviewing agent run on? → A: opus, pinned, whatever model the walk runs on ([CORE-FR-001](#core-fr-001)).
- Q: Must a line the agent says while working, between tool calls, be in the developer's language too? → A: no: any language; every answer, report, gate, question and hand-over must ([CORE-FR-044](#core-fr-044)).
- Q: Does a bug fix keep a handoff note, as a story does? → A: yes: a fix is a task too; it keeps one of its own from its branch on, and a quick review of it writes there ([CORE-FR-005](#core-fr-005)).

### Session 2026-10-29

- Q: Is a bug fix's note kept when the fix lands, as a story's is at `Done`? → A: yes ([CORE-FR-009](#core-fr-009)).
- Q: Does a note for a story still `Todo` fail the check? → A: yes: nothing is started, so the note is a mistake ([CORE-FR-009](#core-fr-009)).
- Q: When must the cases put to the real agent run? → A: whenever the developer asks, and in every quality cross-check, its result written into that story's evidence; no other story must run them ([CORE-FR-047](#core-fr-047)).
- Q: What does a case that fails lead to? → A: nothing this spec decides: the phase writes the cases, and what is done with a result is the eval's own ([CORE-FR-047](#core-fr-047)).
- Q: Does a case hold the agent to a ceiling of tokens? → A: no: a case fails only when the agent did not invoke the command or follow the guide it names; the charter's cost is measured apart ([CORE-FR-048](#core-fr-048)).
- Q: How many cases does each command get? → A: one, asked in plain English words of its triggers; the voice gets two in Vietnamese, one after a slash command and one without ([CORE-FR-049](#core-fr-049)).

### Session 2026-10-31

- Q: How is reaching an internal command proved when the host does not expose it as a public skill? → A: a case may instead require evidence that the agent read that command's instructions; this proves loading, not completion, and changes the earlier invocation-only answer ([CORE-FR-048](#core-fr-048)).

### Session 2026-11-02

- Q: How does code written before the charter get brought under its rules, when no story may touch lines beside it? → A: through /sdd-code-smell, a new walk of its own; the quality pass stays as it is. It is for a product the charter was not applied to before, or a charter that is new.
- Q: How does /sdd-code-smell go through the code? → A: it takes a snapshot of the files with a hash of each, like a read snapshot of a database, assesses them file by file, and keeps the history in a record.
- Q: Which rules does it assess the code against? → A: the coding rules alone: it first lists the charter's rules and drops those that do not concern code.
- Q: What happens to what it finds? → A: it reports them for the developer to review at a gate, where any can be skipped; what is agreed goes to /sdd-plan, which plans the refactoring.
- Q: Who starts /sdd-code-smell? → A: the developer, by hand; an agent never invokes it on its own.
- Q: Does a run assess a file again? → A: not while its hash is unchanged, a new charter included; a file assessed good stays skipped until the developer asks for a rescan in so many words when starting /sdd-code-smell, or its entry is deleted from the record.
- Q: Does the roadmap report show the code smell record? → A: yes, /sdd-report reads and displays it.
- Q: How do the agreed findings become stories? → A: one story per rule, gathering every file that breaks it; a rule with too many files for one reviewable change is split.
- Q: Which files does the snapshot hold? → A: the agent judges which files to leave out, and notes each with why in the record; no fixed list decides it.

### Session 2026-11-03

- Q: Are the files the repository ignores files left out, each noted with why? → A: no: the snapshot holds the files the repository versions or would version, and only those the agent leaves out of it are noted ([CORE-FR-051](#core-fr-051)).
- Q: Does a rescan stopped halfway go on with only the others? → A: no: run again without a rescan, the files it did not reach keep their earlier entries; with one, every file is assessed again.
- Q: Is the language the agent talks in set for the whole repository, or per developer? → A: per developer, kept on their machine and never shared; no language is set for the repository.
- Q: When is a developer asked their language? → A: at /sdd-init; a developer who names none is talked to as the voice says today, in the language of their own words.
- Q: How is a developer who joins a repository already set up asked? → A: /sdd-init run again keeps every answer the repository holds and asks only the language, where their machine holds none; /sdd-doctor points to it as a hint, never a fault.
- Q: A developer who chose a language writes in another: which is answered? → A: the language they chose, always; the language of their words is followed only where they chose none.
- Q: Does the chosen language reach what the walks write into the repository? → A: no: it governs only what the agent says to the developer; the language of the documents the walks write is the repository's, an answer of `manifest.md`.
- Q: Which documents does the document language cover, and with no answer? → A: the specs, the roadmap, the handoff notes, the quality report and the learning notes; not the code, nor the commit messages, which **Message** governs; /sdd-init asks it, and a manifest with no answer means English.

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

---

### CORE Story 4 - Refuse to finish on an unclean state (Priority: P2)

**Status**: Done

Before /sdd-finish lands a story or a fix, it checks that nothing is left
behind: no stray or temporary files, no debug output or leftover markers
added by the change, and no secret. It refuses to land, naming what is left,
until the state is clean.

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
roadmap after every five stories it adds — the number the manifest names, where
it names one — waiting on them, and it is built like any other story.

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
4. **Given** a manifest that names no number and /sdd-plan adding twelve stories, **When** it writes the roadmap, **Then** it adds two quality cross-check stories, the first waiting on the first five stories and the second on the next five ([CORE-FR-019](#core-fr-019), [CORE-SC-005](#core-sc-005)).
5. **Given** a quality cross-check story picked by /sdd-implement, **When** it is built, **Then** the violations its pass reports go to /sdd-plan as stories that fix them, it fixes none itself, and it is `Done` only once the developer has accepted those stories, or the pass found none ([CORE-FR-020](#core-fr-020)).
6. **Given** a quality cross-check story waiting on stories of one spec, **When** it is built, **Then** its pass checks every spec of the set ([CORE-FR-024](#core-fr-024)).

---

### CORE Story 8 - Check the spec-driven setup itself (Priority: P3)

**Status**: Done

The developer asks whether the repository's spec-driven setup is healthy. The
agent checks that the settings point at a spec folder that exists and that
the manifest answers every question /sdd-init asks today, and offers to fix
each fault it finds. The engine — the check on stop, the build, the tools —
is `cw doctor`'s to check, not this one's.

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

**Status**: Done

The first quality pass, run by [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3), failed six items of the
checklist. This story fixes each violation it named, so that the next pass
finds them passing.

**Why this priority**: a `Done` story nothing proves is a claim, and specs that
contradict each other mislead every story built on them.

**Independent Test**: run the quality pass once this story is `Done`; none of
the violations the pass of [CORE Story 9](#core-story-9---quality-cross-check-of-core-stories-18-and-10-priority-p3) named is reported again.

**Acceptance Scenarios**:

1. **Given** [CORE Story 4](#core-story-4---refuse-to-finish-on-an-unclean-state-priority-p2) and [CORE Story 10](#core-story-10---review-with-the-proof-verify-produced-priority-p2) scenario 3, **When** this story is `Done`, **Then** each of their scenarios is held by a test that would fail without it, or by a run their evidence names ([CORE-FR-011](#core-fr-011), [CORE-FR-022](#core-fr-022)).
2. **Given** a bug fix whose baseline recorded a known failure, **When** /sdd-bug-fix hands it over, **Then** it hands it over under the same rules as /sdd-implement, names that failure, and ends on the line the developer set ([CORE-FR-004](#core-fr-004), [CORE-FR-044](#core-fr-044)).
3. **Given** a change with more findings than 128 KB of output holds, **When** the clean-state check writes them into a pipe, **Then** every finding is written ([CORE-FR-010](#core-fr-010)).
4. **Given** the commands the first phase built, **When** the quality pass checks the code against the stories, **Then** each is described by a `Done` story and the FR it cites ([CORE-FR-028](#core-fr-028)).
5. **Given** the checklist's item on the guides, **When** the spec is checked, **Then** its out of scope agrees that the code is checked against the stories and the guides that apply to it ([CORE-FR-014](#core-fr-014)).
6. **Given** handoff notes set to be ignored and a story `In Progress` with no note, **When** /sdd-implement picks it, **Then** it starts from the story and its branch ([CORE-FR-026](#core-fr-026)).
7. **Given** a spec with no `Done` story, **When** the quality pass runs, **Then** it checks that spec against the other specs and no code against it ([CORE-FR-027](#core-fr-027)).
8. **Given** this spec and the index, **When** the next quality pass runs, **Then** "health" names the setup check alone, the Overview gives the product one grade, every mention of how often a cross-check comes takes the manifest's number, and the index names the quality document ([CORE-FR-019](#core-fr-019), [CORE-SC-005](#core-sc-005)).
9. **Given** a developer writing a message in a language, **When** a command of the spec set answers it, **Then** it answers in that language from the first message, and each question it asks says first what it was doing and the problem it met ([CORE-FR-044](#core-fr-044)).

---

### CORE Story 12 - Set a repository up for spec-driven development (Priority: P1)

**Status**: Done

A developer installs the charter and runs /sdd-init. The agent looks at what
the repository already has — its specs, its branches, how it commits and
merges — proposes how the specs become a spec set, and asks how work is
carried out and finished there, each question with a recommendation drawn
from the repository. Once the developer says yes, it writes the settings, the
spec folder, its index and its manifest.

**Why this priority**: every other command reads the spec set and the
manifest; without them none can start.

**Independent Test**: run /sdd-init in a repository with no spec set; it asks
before writing, then writes a spec set that checks.

**Acceptance Scenarios**:

1. **Given** a repository with no spec set, **When** /sdd-init runs, **Then** it reports the specs and habits it found, proposes the spec set, asks each question of the manifest with its recommendation, and writes nothing before the developer says yes ([CORE-FR-029](#core-fr-029)).
2. **Given** the developer's yes, **When** /sdd-init writes, **Then** the settings name the spec folder, which holds the index, the roadmap and the manifest, and the spec set checks ([CORE-FR-029](#core-fr-029), [CORE-FR-030](#core-fr-030)).
3. **Given** a file of the spec set, **When** the agent touches it, **Then** the shape of a spec set comes up for it ([CORE-FR-030](#core-fr-030)).

---

### CORE Story 13 - Plan a phase into stories (Priority: P1)

**Status**: Done

A developer asks for a phase. /sdd-plan says which spec it belongs to,
restates it, clarifies what is unclear, and writes its stories, FR and SC into
that spec and onto the roadmap, pausing for the developer after each step. The
spec set is then analysed for gaps, contradictions and format faults.

**Why this priority**: no story can be built before it is written with the
scenarios that prove it.

**Independent Test**: ask /sdd-plan for a phase; its stories land in the spec
and the roadmap, each citing the FR it proves, and the analysis reports none
of its errors.

**Acceptance Scenarios**:

1. **Given** a request for a phase, **When** /sdd-plan runs, **Then** it restates the phase, asks at most five questions, writes each answer as it is given, and drafts stories numbered after the spec's last one, each `Todo` with the stories it depends on in the roadmap, pausing for the developer at each step ([CORE-FR-031](#core-fr-031)).
2. **Given** a spec set with an FR no story cites, **When** it is analysed, **Then** the analysis names that FR as an error with its fix, and changes nothing ([CORE-FR-032](#core-fr-032)).

---

### CORE Story 14 - See where the roadmap stands (Priority: P2)

**Status**: Done

Whenever the agent stops with the spec folder changed, every id the specs cite
is linked to where it is defined and the spec set is checked; the agent keeps
working while the check fails. The developer can list every story with its
status, the stories that can be built now, and draw the roadmap as one page.

**Why this priority**: a spec set that disagrees with itself, or a roadmap no
one can see, sends the next story the wrong way.

**Independent Test**: cite an id and break a status line, then stop; the
citation is linked and the fault handed back. Draw the roadmap; each story
shows where it stands.

**Acceptance Scenarios**:

1. **Given** a spec citing an id defined in another spec, **When** the agent stops, **Then** the citation links to where it is defined ([CORE-FR-033](#core-fr-033)).
2. **Given** a spec set that fails its check, **When** the agent stops, **Then** the fault is handed back and the agent keeps working ([CORE-FR-033](#core-fr-033)).
3. **Given** a roadmap, **When** the developer asks what can start, **Then** every story not `Done` whose dependencies are all `Done` is listed, in roadmap order ([CORE-FR-034](#core-fr-034)).
4. **Given** a roadmap, **When** the developer asks for it, **Then** every story is listed with its status by spec, and drawn as one page showing where it stands and what it waits on ([CORE-FR-035](#core-fr-035)).

---

### CORE Story 15 - Implement a story from pick to Done (Priority: P1)

**Status**: Done

A developer runs /sdd-implement. It takes a story, opens its branch as the
manifest says, finds the code the story touches, restates the story and the
decisions it needs, and waits for the developer's yes. It then writes a failing
test per scenario before the code that passes it, verifies and reviews the
change, and sets the story `Done` once the developer accepts it.

**Why this priority**: it is the walk every story is built through.

**Independent Test**: run /sdd-implement on a ready story; it stops at the
spec gate before any change, and once accepted the story is `Done`, each of
its scenarios held by a test.

**Acceptance Scenarios**:

1. **Given** a roadmap and no story named, **When** /sdd-implement runs, **Then** it takes the first story `In Progress`, else the first ready one, opens its branch as the manifest says, and names the code it touches by path and lines ([CORE-FR-036](#core-fr-036)).
2. **Given** a story picked, **When** the spec gate is reached, **Then** the story, its scenarios, FR and SC, what is out of scope and each technical decision are put to the developer, and nothing changes before the yes ([CORE-FR-037](#core-fr-037)).
3. **Given** the yes, **When** the story is built, **Then** each scenario gets a failing test before the code that passes it, and the change is verified — every test and static check, and a run of what the story describes — before it is reviewed and handed over ([CORE-FR-038](#core-fr-038), [CORE-FR-039](#core-fr-039)).
4. **Given** a change the developer accepts, **When** the walk ends, **Then** the story is `Done` ([CORE-FR-038](#core-fr-038)).

---

### CORE Story 16 - Fix a bug on a branch of its own (Priority: P2)

**Status**: Done

A developer runs /sdd-bug-fix with a bug. On a fix branch from the development
branch, the agent restates the bug, reproduces it with evidence, and reports
the root cause and the fix for the developer's approval; then it fixes it test
first with the smallest change, verifies and reviews it, and lands it in the
development branch once accepted.

**Why this priority**: a bug found between stories needs a walk of its own
that changes nothing beside it.

**Independent Test**: report a bug; the agent reproduces it and stops at the
report before changing anything, then fixes it with a test that failed for the
bug's own reason.

**Acceptance Scenarios**:

1. **Given** a bug, **When** /sdd-bug-fix runs, **Then** it works on a fix branch started from the development branch, reproduces the bug with evidence, and changes nothing before the developer approves the reported root cause and fix ([CORE-FR-040](#core-fr-040)).
2. **Given** the approval, **When** the fix is made, **Then** a test fails for the bug's own reason before the smallest change that passes it, and the fix lands in the development branch, never in a phase branch ([CORE-FR-040](#core-fr-040)).

---

### CORE Story 17 - Land the work the way the manifest says (Priority: P1)

**Status**: Done

Once a story is `Done`, a fix accepted or a phase complete, /sdd-finish lands
it exactly as the manifest's finishing says — merge, squash-merge or pull
request, into the branch it names — deletes the landed branch as it says, and
ends on where the roadmap stands. Branches whose work landed earlier can be
listed and deleted with the developer's confirmation.

**Why this priority**: work that is built but not landed the agreed way is
not done.

**Independent Test**: finish a `Done` story; it lands in its target the way
the manifest says, its branch deleted as it says.

**Acceptance Scenarios**:

1. **Given** a `Done` story, **When** /sdd-finish runs, **Then** it lands into the branch the manifest names, the way it names, and deletes the branch as it says; where it says nothing, it asks ([CORE-FR-041](#core-fr-041)).
2. **Given** a fix accepted, **When** /sdd-finish runs, **Then** it lands in the development branch, never in a phase branch ([CORE-FR-041](#core-fr-041)).
3. **Given** local branches, some landed, **When** the developer asks to clean up, **Then** the landed ones are listed and only those the developer confirms are deleted, never one whose work has not landed ([CORE-FR-042](#core-fr-042)).

---

### CORE Story 18 - Keep what a session learned (Priority: P3)

**Status**: Done

When a conversation teaches the agent something the next one should know — a
correction, a preference, a constraint — it is written as a dated note in the
learning inbox, never into the agent's own memory, so the project can turn
repeated lessons into rules.

**Why this priority**: a lesson kept in one agent's memory is lost to every
other agent and machine, and no one can read or review it.

**Independent Test**: correct the agent in a session and ask it to learn; a
note appears in the inbox and the agent's memory is untouched.

**Acceptance Scenarios**:

1. **Given** a correction in the conversation, **When** the agent is asked to learn from it, **Then** a dated note in the learning inbox holds the lesson, why, and how to apply it ([CORE-FR-043](#core-fr-043)).
2. **Given** anything worth keeping, **When** the agent would save it, **Then** it never writes to its own memory ([CORE-FR-043](#core-fr-043)).

---

### CORE Story 19 - Answer in the user's language after a slash command, and propose before asking (Priority: P2)

**Status**: Done

A developer types a slash command followed by a few words of their own
language. Every report, gate, question and hand-over of the walk is in that
language, though the command and the charter are written in another; a line
said while working may be in any. Each question it asks says what it
was doing and the problem it met, proposes one way on, and only then asks.

**Why this priority**: an answer in the wrong language, or a question with no
proposal, leaves the developer to work out what is asked and what to answer.

**Independent Test**: type a command followed by words of another language
over a failing baseline; the walk reports in that language, and its question
names the failure and proposes one of its ways on. Ask something outside any
command; the answer keeps the same voice.

**Acceptance Scenarios**:

1. **Given** a slash command followed by words in a language, **When** the command answers, **Then** every report, gate, question and hand-over is in that language, while a line said as it works may be in any ([CORE-FR-044](#core-fr-044)).
2. **Given** a question with several ways on, **When** it is asked, **Then** it says what was being done and the problem met, proposes one way, and only then asks ([CORE-FR-044](#core-fr-044)).
3. **Given** the developer writing outside any command of the spec set, **When** the agent answers, **Then** it talks in the same voice as the commands, from one source that is always on ([CORE-FR-044](#core-fr-044)).
4. **Given** a change to review, **When** the reviewing agent is spawned, **Then** it runs on the opus model, whatever model the walk runs on ([CORE-FR-001](#core-fr-001)).
5. **Given** a manifest whose **Conversation** is short, **When** a step of the walk passes, **Then** nothing is said of it; only a failure, a warning or a question is ([CORE-FR-044](#core-fr-044)).

---

### CORE Story 20 - Choose how strict the review is (Priority: P2)

**Status**: Done

/sdd-init asks the developer whether the review of a change is strict or
quick, and writes the answer to the manifest. Strict hands every `nit` and `q`
to the developer, as before. Quick acts on no `nit`, settling for writing it to
the handoff note; it settles a small `q` itself, writing what it chose to the
handoff note, and asks the developer only the rest. Nothing it settles alone is
said in the chat.

**Why this priority**: a developer who trusts the walk is slowed by every
small finding put to them at the hand-over.

**Independent Test**: with a quick review, finish a change whose review leaves
a `nit` and a small `q`; the hand-over asks neither, and the handoff note holds
both, with what was chosen.

**Acceptance Scenarios**:

1. **Given** /sdd-init, **When** it asks how work is carried out, **Then** it asks whether the review is strict or quick, and writes the answer to the manifest ([CORE-FR-045](#core-fr-045)).
2. **Given** a quick review that leaves a `nit`, **When** the change is handed over, **Then** the `nit` is not acted on, is written to the handoff note, and is not said in the chat ([CORE-FR-046](#core-fr-046)).
3. **Given** a quick review that leaves a `q` whose answer changes no FR, scenario or out of scope and touches only the files the story changed, **When** the change is handed over, **Then** the agent settles it, writes what it chose to the handoff note, and does not ask it ([CORE-FR-046](#core-fr-046)).
4. **Given** a quick review that leaves any other `q`, **When** the change is handed over, **Then** it is asked ([CORE-FR-046](#core-fr-046)).
5. **Given** a strict review, or a manifest with no answer on it, **When** the change is handed over, **Then** every `nit` and `q` is put to the developer, as before ([CORE-FR-045](#core-fr-045), [CORE-FR-046](#core-fr-046)).
6. **Given** a bug fix, **When** /sdd-bug-fix opens its branch, **Then** the fix gets a handoff note of its own, brought up to date before every stop, and a quick review of the fix writes to it ([CORE-FR-005](#core-fr-005), [CORE-FR-046](#core-fr-046)).

---

### CORE Story 21 - Keep the handoff note once the story is Done (Priority: P2)

**Status**: Done

When a story is set to `Done`, its handoff note stays where it is: committed
with the work where the manifest commits notes, left in the working tree where
it ignores them. Neither the check of the spec set nor /sdd-finish refuses a
`Done` story for keeping its note.

**Why this priority**: what a story decided on its way, its quick-review
findings included, is lost the moment its note is removed.

**Independent Test**: finish a story with committed notes; its note is in the
landed commit, and the check and /sdd-finish pass.

**Acceptance Scenarios**:

1. **Given** a story set to `Done`, **When** it is finished, **Then** its handoff note stays, committed or ignored as the manifest says ([CORE-FR-009](#core-fr-009)).
2. **Given** a `Done` story whose note stayed, **When** the spec set is checked or /sdd-finish lands it, **Then** neither fails on the note ([CORE-FR-009](#core-fr-009), [CORE-FR-010](#core-fr-010)).

---

### CORE Story 22 - Put the charter's promises to the real agent (Priority: P2)

**Status**: Done

The checks run by hand in clones to prove the charter right become cases the
developer can run again against the real agent after any change to the charter:
each command of the spec set the agent may invoke on its own asked for in plain words, the voice asked in
Vietnamese, a correction to keep, and an edit of a spec. Walks across gates,
and checks that need a broken state set up first, stay checks by hand.

**Why this priority**: a change to one primitive can stop the agent from
reaching a command or following a guide, and nothing run again today says so.

**Independent Test**: run the cases on the last commit; each command of the
spec set the agent may invoke on its own is invoked from its case, or its internal instructions are read, and
each guide's case is graded as followed.

**Acceptance Scenarios**:

1. **Given** the cases, **When** they are run, **Then** each command of the spec set the agent may invoke on its own has one case asking for it in plain English words of its triggers, passing when the agent invokes that command or reads the instructions of an internal command ([CORE-FR-048](#core-fr-048), [CORE-FR-049](#core-fr-049), [CORE-SC-006](#core-sc-006)).
2. **Given** a request in Vietnamese, one after a slash command and one without, **When** each is run, **Then** its case passes when the agent answered in Vietnamese the way the voice says ([CORE-FR-044](#core-fr-044), [CORE-FR-049](#core-fr-049)).
3. **Given** a request to remember a correction, **When** it is run, **Then** its case passes when the agent wrote it as a note in the learning inbox and not into its own memory ([CORE-FR-043](#core-fr-043), [CORE-FR-049](#core-fr-049)).
4. **Given** a request to add an edge case to a spec, **When** it is run, **Then** its case passes when the agent wrote it in the spec format ([CORE-FR-049](#core-fr-049)).
5. **Given** any case, **When** it is run, **Then** it expects only an invocation, an internal command's instructions read, or a guide followed, and no ceiling of tokens ([CORE-FR-048](#core-fr-048)).

---

### CORE Story 23 - Quality cross-check of CORE Stories 11 and 19–22 (Priority: P3)

**Status**: Todo

Once CORE Stories 11 and 19–22 are `Done`, /sdd-quality checks the code and
every spec against the checklist of the quality document, and each violation
it reports becomes a story; the cases put to the real agent are run, and how
many passed and failed is written into this story's evidence.

**Why this priority**: five stories have landed since the last quality pass.

**Independent Test**: once its stories are `Done`, build this story; the
quality document ends with the new report, and its evidence names the cases
run.

**Acceptance Scenarios**:

1. **Given** CORE Stories 11 and 19–22 `Done`, **When** this story is built, **Then** /sdd-quality checks the code and every spec against the checklist of the quality document, each violation it reports becomes a story, and the cases put to the real agent are run, their count of passed and failed in this story's evidence ([CORE-FR-014](#core-fr-014), [CORE-FR-020](#core-fr-020), [CORE-FR-047](#core-fr-047)).

---

### CORE Story 24 - Find the code smells of a repository (Priority: P2)

**Status**: Done

A developer brings the charter to a product it was not applied to before, or
takes a new charter, and starts /sdd-code-smell by hand. It lists the rules
that concern code, takes a snapshot of the files with a hash of each, assesses
them one by one against those rules, and keeps what it found in the code smell
record. Run again, it goes on from what the record already holds.

**Why this priority**: a change touches only what its task concerns, so
nothing else ever goes looking for a line that was wrong before.

**Independent Test**: in a repository holding one file that breaks a coding
rule and one that breaks none, run /sdd-code-smell; the record holds both with
their hashes and names the broken rule, and a second run assesses neither.

**Acceptance Scenarios**:

1. **Given** a charter, **When** /sdd-code-smell starts, **Then** it lists the charter's rules and drops those that do not concern code, naming each one dropped ([CORE-FR-050](#core-fr-050)).
2. **Given** a repository, **When** the snapshot is taken, **Then** it holds each file to assess with its hash, and each file left out is noted in the record with why ([CORE-FR-051](#core-fr-051)).
3. **Given** a snapshot, **When** a file has been assessed, **Then** the record holds its hash, when it was assessed, whether it is good, and each finding by rule and line, and no code has changed ([CORE-FR-052](#core-fr-052), [CORE-FR-053](#core-fr-053)).
4. **Given** a record, **When** /sdd-code-smell runs again on files whose hash is unchanged, under the same charter or a new one, **Then** it does not assess them again, and it assesses each file that is new or changed ([CORE-FR-054](#core-fr-054)).
5. **Given** a file skipped for an unchanged hash, **When** the developer asks for a rescan in so many words when starting the command, or deletes its entry from the record, **Then** it is assessed again ([CORE-FR-054](#core-fr-054)).
6. **Given** a run that stopped halfway, **When** /sdd-code-smell runs again, **Then** the files already assessed are kept and only the others are assessed ([CORE-FR-052](#core-fr-052), [CORE-FR-054](#core-fr-054)).
7. **Given** a conversation in which the developer did not start it, **When** the agent works, **Then** /sdd-code-smell is not invoked ([CORE-FR-055](#core-fr-055)).

---

### CORE Story 25 - Review the code smells and plan the refactoring (Priority: P2)

**Status**: Todo

The assessment over, the developer reviews what was found, grouped by rule,
and skips what they do not want fixed. What they agree to goes to /sdd-plan,
which writes the refactoring as stories on the roadmap.

**Why this priority**: findings nobody decided on and nobody planned fix
nothing; and the developer, not the agent, says what is worth the change.

**Independent Test**: on a record with findings under two rules, skip one
rule's at the gate; /sdd-plan writes one story, for the other rule, and the
skipped findings do not come back on the next run.

**Acceptance Scenarios**:

1. **Given** an assessment over, **When** it is reported, **Then** the developer gets the findings grouped by rule with their files, and nothing is planned before the developer's yes ([CORE-FR-056](#core-fr-056)).
2. **Given** the report, **When** the developer skips a finding, **Then** the record marks it skipped, it goes into no story, and it stays skipped while the file's hash is unchanged ([CORE-FR-057](#core-fr-057)).
3. **Given** findings agreed, **When** the plan step runs, **Then** /sdd-plan writes one story per rule gathering every file that breaks it, and splits a rule too big for one reviewable change ([CORE-FR-058](#core-fr-058)).
4. **Given** a refactoring story so planned, **When** it is read, **Then** its scenarios hold that the product behaves as it did before ([CORE-FR-059](#core-fr-059)).
5. **Given** an assessment with no finding left to agree, **When** it is reported, **Then** it says so and /sdd-plan is not run ([CORE-FR-056](#core-fr-056)).

---

### CORE Story 26 - See the code smells in the roadmap report (Priority: P3)

**Status**: Todo

A developer draws the roadmap and sees, beside the stories, what the code
smell record holds: how many files were assessed, left out and good, and the
findings by rule, agreed or skipped.

**Why this priority**: useful once the record exists, and the record can be
read without it.

**Independent Test**: with a record present, run /sdd-report; the report shows
it. Remove the record and run it again; the roadmap is drawn as before.

**Acceptance Scenarios**:

1. **Given** a code smell record, **When** /sdd-report runs, **Then** the report shows its files and findings by rule ([CORE-FR-060](#core-fr-060)).
2. **Given** no code smell record, **When** /sdd-report runs, **Then** the roadmap is drawn and the report says no code smell has been assessed ([CORE-FR-060](#core-fr-060)).
3. **Given** a record that cannot be read, **When** /sdd-report runs, **Then** the roadmap is still drawn and the report says the record could not be read ([CORE-FR-060](#core-fr-060)).

---

### CORE Story 27 - Talk to each developer in the language they chose, and write the documents in the repository's (Priority: P2)

**Status**: Todo

At /sdd-init a developer says which language the agent talks to them in. The
answer is kept on their machine, never in the repository, and every walk reads
it: whatever language they write in, they are answered in the one they chose.
A developer who joins a repository already set up runs /sdd-init and is asked
only that. One who chooses none is talked to as before, in the language of
their own words. /sdd-init also asks the language of the repository's
documents and records it in the manifest: the specs, the roadmap, the handoff
notes, the quality report and the learning notes the walks write are in it,
whatever language each developer is talked to in. A manifest with no answer
means English, as every repository has been until now.

**Why this priority**: guessing the language from each message goes wrong
where a message holds no words of the developer's own, or mixes two; a choice
made once ends the guessing; and a team that works in one language wants
its documents in it, whoever reads the chat.

**Independent Test**: choose a language at /sdd-init, then write a command in
another; the walk reports in the one chosen. Remove the choice; it reports in
the language of the words again. Answer a document language other than
English and plan a story: the spec and the roadmap entry are in it, while the
agent talks in the developer's own.

**Acceptance Scenarios**:

1. **Given** a repository not yet set up, **When** /sdd-init runs, **Then** it asks the developer which language to talk to them in and keeps the answer in their own settings, which version control ignores ([CORE-FR-061](#core-fr-061)).
2. **Given** a repository already set up, and a developer whose machine holds no language, **When** /sdd-init runs, **Then** it changes no answer the repository holds and asks only the language ([CORE-FR-062](#core-fr-062)).
3. **Given** a developer who chose a language, **When** they write a command, or any message, in another, **Then** every answer, report, gate, question and hand-over is in the language chosen ([CORE-FR-044](#core-fr-044), [CORE-FR-063](#core-fr-063), [CORE-SC-009](#core-sc-009)).
4. **Given** a developer who chose none, **When** a command runs, **Then** the agent talks in the language of their own words, as before ([CORE-FR-044](#core-fr-044)).
5. **Given** two developers of one repository who chose two languages, **When** each runs a command, **Then** each is answered in their own, and neither choice reaches the repository ([CORE-FR-061](#core-fr-061), [CORE-FR-063](#core-fr-063)).
6. **Given** a developer whose machine holds no language, **When** /sdd-doctor runs, **Then** it points to /sdd-init as a hint and fails nothing for it ([CORE-FR-064](#core-fr-064)).
7. **Given** the cases put to the real agent, **When** they are read, **Then** one holds a developer who chose a language to it while writing in another ([CORE-FR-049](#core-fr-049), [CORE-SC-009](#core-sc-009)).
8. **Given** /sdd-init, **When** it asks how work is carried out, **Then** it asks the document language and records the answer in the manifest ([CORE-FR-065](#core-fr-065)).
9. **Given** a manifest naming a document language, **When** a walk writes a spec, a roadmap entry, a handoff note, the quality report or a learning note, **Then** it is written in that language, while what the agent says follows the developer's own ([CORE-FR-063](#core-fr-063), [CORE-FR-066](#core-fr-066)).
10. **Given** a manifest with no document language, **When** a walk writes a document, **Then** it is written in English, and /sdd-doctor fails nothing for the missing answer ([CORE-FR-065](#core-fr-065)).
11. **Given** a document language, **When** a walk writes code or a commit message, **Then** neither follows it: the commit message keeps the manifest's **Message** answer ([CORE-FR-066](#core-fr-066)).

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
- A command whose case stops at its first gate, with no one there to answer — the case passes on the invocation alone; what follows the gate is still checked by hand.
- A file that changes after the snapshot — its entry keeps the hash of what was assessed, so the next run assesses it again.
- A file deleted since the last run — its entry is dropped from the record, and a finding on it is not planned.
- A rescan stopped halfway — run again without a rescan, the files it did not reach keep their earlier entries; with one, every file is assessed again.
- A file that a refactoring story changed — its hash no longer matches, so the next run assesses it again.
- A developer's own settings that cannot be read — the agent talks as if no language were chosen, and says once that it could not read them ([CORE-FR-063](#core-fr-063)).
- A document language changed after documents were written — the documents already written stay as they are; only what is written next follows the new answer ([CORE-FR-066](#core-fr-066)).

## Requirements *(mandatory)*

### Functional Requirements

**Review**

- <a id="core-fr-001"></a>**CORE-FR-001**: The review of a change MUST be made by an agent other than the one that wrote it, run on the opus model, starting from the story, the FR and SC it cites, the guides that apply to the changed files, the change and the line its verify ended on, and nothing else.
- <a id="core-fr-002"></a>**CORE-FR-002**: That review MUST grade each finding `bug`, `risk`, `nit` or `q`, and fail on any `bug` or `risk`.
- <a id="core-fr-021"></a>**CORE-FR-021**: The review step MUST verify the change first, and stop before any review is made when verify fails.
- <a id="core-fr-022"></a>**CORE-FR-022**: The review MUST count a scenario proven by a test that would fail without it or by the line verify ended on, and fail on a scenario proven by neither.
- <a id="core-fr-023"></a>**CORE-FR-023**: Verify MUST report a failing check without changing anything itself; the walk goes back to the change.

**Baseline**

- <a id="core-fr-003"></a>**CORE-FR-003**: Before a story's or a fix's first change, the agent MUST run every test and static check the project defines and report whether they pass, or say that it defines none and ask whether to go on.
- <a id="core-fr-004"></a>**CORE-FR-004**: On a failing baseline the agent MUST stop and ask the developer to fix it first or to record it as known; a known failure MUST NOT fail the story's verify step on its own, and MUST be named at the hand-over.

**Handoff**

- <a id="core-fr-005"></a>**CORE-FR-005**: A story `In Progress`, and a bug fix not yet landed, MUST have a handoff note of its own in the spec folder whenever a session stops on it.
- <a id="core-fr-006"></a>**CORE-FR-006**: A handoff note MUST say what is done, what remains, the decisions taken and what blocks the story, and nothing the spec already says.
- <a id="core-fr-007"></a>**CORE-FR-007**: /sdd-init MUST ask whether handoff notes are committed or ignored, and record the answer in the manifest.
- <a id="core-fr-008"></a>**CORE-FR-008**: /sdd-implement MUST read a story's handoff note before working on it again, and say where the note and the code differ, the code winning.
- <a id="core-fr-009"></a>**CORE-FR-009**: A story's or a bug fix's handoff note MUST stay when the story is set to `Done` or the fix lands, committed or ignored as the manifest says; a note for a story still `Todo` MUST fail the check of the spec set.
- <a id="core-fr-026"></a>**CORE-FR-026**: Where handoff notes are ignored, /sdd-implement MUST start a story `In Progress` that has no note from the story and its branch.

**Clean state**

- <a id="core-fr-010"></a>**CORE-FR-010**: /sdd-finish MUST refuse to land a story or a fix while its change holds a stray or temporary file, debug output, a leftover marker, or a secret, naming each; a finding the developer accepts for that change no longer blocks it.

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
- <a id="core-fr-047"></a>**CORE-FR-047**: Where the repository holds cases put to the real agent, a quality cross-check story MUST run every one of them and write how many passed and failed into its evidence; no other story is held to run them.
- <a id="core-fr-048"></a>**CORE-FR-048**: A case put to the real agent MUST expect only that the agent invoked a command of the spec set, read the instructions of an internal command, or followed a guide of the charter, and MUST NOT hold it to a ceiling of tokens.
- <a id="core-fr-024"></a>**CORE-FR-024**: A quality pass MUST check every spec of the set, whichever stories the cross-check waits on.
- <a id="core-fr-025"></a>**CORE-FR-025**: The quality document MUST hold the checklist the quality pass checks against: /sdd-init writes it from its template, the project may edit it, and a pass that finds none writes it the same way first.
- <a id="core-fr-027"></a>**CORE-FR-027**: A quality pass MUST check a spec with no `Done` story against the other specs, and no code against it.

**Health**

- <a id="core-fr-017"></a>**CORE-FR-017**: A health check MUST report whether the settings, the spec folder and every answer of the manifest are in place, each with its reason; it checks nothing of the engine — the check on stop, the build, the tools.
- <a id="core-fr-018"></a>**CORE-FR-018**: For each fault, the health check MUST offer the fix: the one question to ask, or /sdd-init.

**Setup**

- <a id="core-fr-029"></a>**CORE-FR-029**: /sdd-init MUST survey the specs and the habits the repository already has, propose how they become a spec set, and ask how work is carried out and finished, writing the settings, the spec folder, its index and its manifest only once the developer says yes.
- <a id="core-fr-030"></a>**CORE-FR-030**: A spec set MUST keep one shape — an index of specs, one spec per part with its ids under the part's prefix, a roadmap of every story, the manifest, the decisions, the quality document — saying what and why, never how, and that shape MUST come up whenever a file of it is touched.

**Planning**

- <a id="core-fr-031"></a>**CORE-FR-031**: /sdd-plan MUST write a phase's stories, FR and SC into the spec of its part — a new spec for a new part — after clarifying what is unclear, at most five questions, each answer written as it is given, and add each story to the roadmap with the stories it depends on, pausing for the developer after each step.
- <a id="core-fr-032"></a>**CORE-FR-032**: The analysis of a spec set MUST report each gap, contradiction and format fault by id, with its severity and its fix, and change nothing.

**Roadmap**

- <a id="core-fr-033"></a>**CORE-FR-033**: Whenever the agent stops with the spec folder changed, every id the specs cite MUST be linked to where it is defined, across the specs, and the agent MUST NOT stop while the spec set fails its check.
- <a id="core-fr-034"></a>**CORE-FR-034**: The stories that can be built now — not `Done`, every dependency `Done` — MUST be listable in roadmap order.
- <a id="core-fr-035"></a>**CORE-FR-035**: Every story MUST be listable with its status by spec, and the roadmap drawable as one page showing each story's status and what it waits on.

**Implementing**

- <a id="core-fr-036"></a>**CORE-FR-036**: /sdd-implement MUST take the story the developer names, else the first `In Progress`, else the first ready one, open its branch as the manifest says, and name the code it touches by path and lines.
- <a id="core-fr-037"></a>**CORE-FR-037**: Before a story's first change, /sdd-implement MUST put to the developer the story's intent, scenarios, FR and SC, what is out of scope, and each technical decision it needs, and change nothing before the yes.
- <a id="core-fr-038"></a>**CORE-FR-038**: Each scenario MUST get a failing test before the code that passes it, and the story MUST be set `Done` only once the developer accepts the change.
- <a id="core-fr-039"></a>**CORE-FR-039**: A change MUST be verified — every test and static check the project defines, and a run of what the story describes — before it is reviewed and handed over.

**Bug fix**

- <a id="core-fr-040"></a>**CORE-FR-040**: /sdd-bug-fix MUST fix a bug on a fix branch from the development branch: reproduce it with evidence, report the root cause and the fix and change nothing before the developer approves, fix it with a test that fails for the bug's own reason and the smallest change that passes it, and land it in the development branch.

**Finishing**

- <a id="core-fr-041"></a>**CORE-FR-041**: /sdd-finish MUST land a `Done` story, an accepted fix or a phase exactly as the manifest's finishing says — merge, squash-merge or pull request, into the branch it names, a fix into the development branch — and delete the landed branch as it says; where it says nothing, it asks.
- <a id="core-fr-042"></a>**CORE-FR-042**: The local branches whose work has landed MUST be listable, and only those the developer confirms deleted, never one whose work has not landed.

**Learning**

- <a id="core-fr-043"></a>**CORE-FR-043**: What a conversation taught — a correction, a preference, a constraint — MUST be written as a dated note in the learning inbox, and never into the agent's own memory.

**Voice**

- <a id="core-fr-044"></a>**CORE-FR-044**: Every command of the spec set, and the agent between them, MUST report to the developer in the language the developer chose, or where they chose none in the language they write in — every answer, report, gate, question and hand-over but its closing line, a line said while working left free — in the voice the walks share; each question it asks MUST first say what it was doing, the problem it met there, and the fix it proposes; where the manifest's **Conversation** is short, a step that passes MUST say nothing; a hand-over MUST end on the line the developer set, word for word.

- <a id="core-fr-061"></a>**CORE-FR-061**: /sdd-init MUST ask the developer which language the agent talks to them in, and keep the answer in settings of their own, on their machine, which version control ignores and no other developer reads.
- <a id="core-fr-062"></a>**CORE-FR-062**: /sdd-init run on a repository already set up MUST keep every answer the repository holds and ask only the language, where the developer's machine holds none.
- <a id="core-fr-063"></a>**CORE-FR-063**: Every command of the spec set, and the agent between them, MUST read the developer's own settings each time it starts, and talk in the language chosen there whatever language the developer writes in; with none chosen, or settings it cannot read, it MUST talk as [CORE-FR-044](#core-fr-044) says, saying once that it could not read them.
- <a id="core-fr-064"></a>**CORE-FR-064**: /sdd-doctor MUST point a developer whose machine holds no language to /sdd-init as a hint, and MUST NOT fail the check for it.

**Document language**

- <a id="core-fr-065"></a>**CORE-FR-065**: /sdd-init MUST ask the language of the repository's documents and record it in the manifest; a manifest with no answer reads as English, and /sdd-doctor MUST NOT fail it for the missing answer.
- <a id="core-fr-066"></a>**CORE-FR-066**: The specs, the roadmap, the handoff notes, the quality report and the learning notes a walk writes MUST be written in the manifest's document language; code and commit messages MUST NOT follow it; documents written before the answer changed MUST be left as they are.

**Review mode**

- <a id="core-fr-045"></a>**CORE-FR-045**: /sdd-init MUST ask whether the review of a change is strict or quick and record the answer in the manifest; a manifest with no answer reads as strict.
- <a id="core-fr-046"></a>**CORE-FR-046**: In a quick review, a `nit` MUST NOT be acted on but written to the handoff note of the story or fix; a `q` whose answer changes no FR, scenario or out of scope and touches only the files the story or fix changed MUST be settled by the agent and written to the handoff note; neither is said in the chat, and every other `q` is asked. In a strict review every `nit` and `q` MUST be put to the developer.

**Coverage**

- <a id="core-fr-028"></a>**CORE-FR-028**: Every command the charter offers MUST be described by a `Done` story of the spec set and the FR it cites.
- <a id="core-fr-049"></a>**CORE-FR-049**: The cases put to the real agent MUST hold one case for each command of the spec set the agent may invoke on its own, asked in plain English words of its triggers; two in Vietnamese held to the voice, one after a slash command and one without; one held to where learnings go; one in which a developer who chose a language writes in another, held to the language chosen; and one held to the spec format.

**Code smell**

- <a id="core-fr-050"></a>**CORE-FR-050**: /sdd-code-smell MUST assess the code against the charter's coding rules alone, first listing the rules and naming each one it drops for not concerning code.
- <a id="core-fr-051"></a>**CORE-FR-051**: /sdd-code-smell MUST take a snapshot of the files the repository versions or would version, not those it ignores, with a hash of each; the agent judges which of them to leave out, and MUST note each with why in the code smell record.
- <a id="core-fr-052"></a>**CORE-FR-052**: /sdd-code-smell MUST assess the snapshot file by file and write each file's result to the code smell record, kept in the spec folder, as soon as the file is assessed: the hash of what was assessed, the date, whether it is good, and each finding by rule and line.
- <a id="core-fr-053"></a>**CORE-FR-053**: /sdd-code-smell MUST NOT change any code; fixing what it finds is the work of the stories planned from it.
- <a id="core-fr-054"></a>**CORE-FR-054**: A run MUST NOT assess again a file whose hash matches its entry, whatever the charter, unless the developer asks for a rescan in so many words when starting the command or the entry was deleted; a file that is new or changed MUST be assessed, and the entry of a file that is gone MUST be dropped.
- <a id="core-fr-055"></a>**CORE-FR-055**: /sdd-code-smell MUST run only when the developer starts it; the agent MUST NOT invoke it on its own.
- <a id="core-fr-056"></a>**CORE-FR-056**: /sdd-code-smell MUST report its findings grouped by rule with their files for the developer's review, and plan nothing before the yes; with no finding left to agree it MUST say so and not run /sdd-plan.
- <a id="core-fr-057"></a>**CORE-FR-057**: The developer MUST be able to skip any finding at that review; a skipped finding MUST be marked in the code smell record, go into no story, and stay skipped while the file's hash is unchanged.
- <a id="core-fr-058"></a>**CORE-FR-058**: The findings agreed MUST go to /sdd-plan as one story per rule, gathering every file that breaks it, and a rule too big for one reviewable change MUST be split.
- <a id="core-fr-059"></a>**CORE-FR-059**: A story planned from the findings MUST hold in its scenarios that the product behaves as it did before.
- <a id="core-fr-060"></a>**CORE-FR-060**: /sdd-report MUST show the code smell record beside the roadmap: its files and its findings by rule, agreed or skipped; with no record, or one it cannot read, it MUST still draw the roadmap and say so.

### Key Entities

- **Handoff note**: where a story in progress, or a bug fix not yet landed, stands — done, remaining, decisions, blockers. One per story or fix, written while the story is `In Progress` or the fix is not yet landed, and kept once it is `Done` or has landed.
- **Evidence**: a one-line summary of what proved a `Done` story and when; part of the story's roadmap entry.
- **Quality document**: the checklist a quality pass checks the code and the specs against, written from its template and kept and edited by the project, followed by the report of the last pass.
- **Quality report**: each item of the checklist passed or failed, with its violations, and the overall grade; the last section of the quality document, rewritten by each pass.
- **Developer settings**: the answers of one developer alone — the language the agent talks to them in — kept on their machine, never versioned or shared.
- **Code smell record**: what /sdd-code-smell has assessed, one entry per file — its hash, the date, whether it is good, its findings by rule and line and whether each was skipped — and the files left out with why; the history a run reads to know what it need not assess again.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- <a id="core-sc-001"></a>**CORE-SC-001**: A story resumed in a new session asks the developer no question already answered in the session before it.
- <a id="core-sc-002"></a>**CORE-SC-002**: Every check this spec adds gives the same result run twice on the same state, and changes nothing it checks.
- <a id="core-sc-003"></a>**CORE-SC-003**: Every `Done` story landed after this phase carries evidence in the roadmap.
- <a id="core-sc-004"></a>**CORE-SC-004**: A failure present before a story started is never reported as caused by it.
- <a id="core-sc-005"></a>**CORE-SC-005**: Once this phase is done, no more stories in a row than the number the manifest names — five where it names none — land without a quality pass between them.
- <a id="core-sc-006"></a>**CORE-SC-006**: Every command the charter offers, but one only the developer may start, is the subject of at least one case put to the real agent.
- <a id="core-sc-007"></a>**CORE-SC-007**: A second run of /sdd-code-smell on an unchanged repository assesses 0 files.
- <a id="core-sc-008"></a>**CORE-SC-008**: Every finding of a finished assessment ends either in a story on the roadmap or marked skipped: 0 are left undecided.
- <a id="core-sc-009"></a>**CORE-SC-009**: In the cases put to the real agent, 100% of the answers to a developer who chose a language are in it, whatever language the request is written in.

## Assumptions

- A handoff note stays when its story is `Done`, committed or ignored as the manifest says.
- An existing manifest without the handoff answer is read as "committed".
- The health check runs when the developer asks. The quality pass runs in each quality cross-check story, and whenever the developer asks.
- A phase that adds fewer stories than the manifest's number — five where it names none — adds no quality cross-check story; its stories count toward the next.
- The cases put to the real agent run on the last commit, on whatever the agent is signed in with, and the agent there runs no shell command.
- An existing manifest without the document language is read as English; a developer with no settings of their own is talked to as before.
- A new charter does not by itself bring unchanged files back to /sdd-code-smell: the developer asks for a rescan when that is wanted.

## Out of Scope

- A language the agent talks in set for the whole repository: each developer chooses their own.
- Translating documents already written when the document language changes.

- Running /sdd-code-smell on a schedule, on every story or from the quality pass, whose checks stay as they are.
- Assessing a file again on the rule that changed alone: a rescan assesses the whole file.
- Benchmarks and structured logging of the product: they belong to a product, not to the charter.
- Running the quality pass on a schedule; the developer may schedule it themselves.
- Cases that walk past a gate, or that need a broken state set up before they run: they stay checks by hand.
- What is done with the result of a case put to the real agent: it is the eval's own.
- Running the cases put to the real agent in continuous integration: each run spends real tokens.
- Judging the style of code no story describes: the pass checks the code only against the stories and the guides that apply to it.
