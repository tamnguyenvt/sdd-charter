# Architecture decisions

## ADR-001: Persist only completed code assessments

**Decision**: Taking a snapshot never writes persistent state. The code smell
record holds only assessed files and their review decisions. Exclusions are
recomputed and explained on each run, never saved.

**Why**: A snapshot can be repeated; only completed assessments need to survive
between runs.

**Consequences**: All later consumers of the record must work without saved
exclusions. Legacy exclusions are ignored on reads and removed on the next
explicit write. Entries for files no longer present are removed on an
explicit update, not by a snapshot.

Source: [CORE Story 24](spec-core.md#core-story-24---find-the-code-smells-of-a-repository-priority-p2), [CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054), reversed by the developer
while implementing [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) on 2026-11-03.

## ADR-002: Rename the assessment listing command and bypass history on repeats

**Decision**: The listing command is `scan`, replacing `snapshot`; its full
repeat flag is `--again`, replacing `--rescan`. A full repeat does not read
previous assessments, including an unreadable record. Successful listings
print only hashes and file paths. Existing repository eligibility exclusions
still apply.

**Why**: The developer requested clearer names and an explicit way to list
all assessable files independently of the old record.

**Consequences**: All callers use the new command and flag. The old names
are rejected. Normal scans still compare current hashes against assessments;
listing files never records an assessment or alters review decisions.

Source: [CORE Story 24](spec-core.md#core-story-24---find-the-code-smells-of-a-repository-priority-p2), [CORE-FR-051](spec-core.md#core-fr-051), [CORE-FR-054](spec-core.md#core-fr-054), revised while implementing
[CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2) on 2026-11-03. This extends ADR-001.

## ADR-003: Address a skipped finding by its id

**Decision**: Each finding receives an automatic, stable id tied to its path,
assessed content, rule, line and occurrence at that location. Review reports
show the id. `findings <id> skip` replaces the standalone skip command and
marks exactly one finding. Agreement retains its existing arguments.

**Why**: The developer wants to choose a finding directly from the report.

**Consequences**: Callers use ids for skipping. Legacy assessments receive
ids on reads without writing; explicit updates persist them. Caller-provided
ids do not override generated identities. Changed content gets new ids.

Source: [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2), [CORE-FR-057](spec-core.md#core-fr-057), revised on 2026-11-03.

## ADR-004: Address agreement by finding id as well

**Decision**: `findings <id> agree [reason]` replaces standalone agreement.
Both review actions address exactly one id and accept an optional reason.
A repeated action without a reason keeps its previous reason; a changed
status clears a previous reason unless replaced. Agreement refuses skipped
findings. Acceptance of the planned story still precedes agreement.

**Why**: The developer requested the same interface and reason support for
agreement as for skipping.

**Consequences**: Callers stop using path/rule/line for agreement. Status and
reason survive unchanged assessments; changed content clears both.
This replaces ADR-003's decision to retain the old agreement arguments.

Source: [CORE Story 25](spec-core.md#core-story-25---review-the-code-smells-and-plan-the-refactoring-priority-p2), [CORE-FR-057](spec-core.md#core-fr-057), [CORE-FR-058](spec-core.md#core-fr-058), revised on 2026-11-03.
