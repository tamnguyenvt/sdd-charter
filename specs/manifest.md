# Manifest

How work on a story or a bug fix is carried out and finished in this
repository. Read by /sdd-implement, /sdd-bug-fix and /sdd-finish; changed only
by asking the user.

## Specs

- **Folder**: `specs`
- **Quality cross-check**: every 5 stories

## Working

- **Worktree**: main — every story in the main worktree, on its own branch
- **Order**: linear — one story at a time, in plan.json order
- **Development branch**: `develop`
- **Branches**: phase branch `<nnn>-<slug>` from `develop`; story branch `task/<prefix>-<n>-<slug>` started from it; a bug fix on `fix/<slug>` from the development branch

## Talking

- **Conversation**: short — a gate says only what it asks; what changed is never listed, the user reads the code and asks

## Committing

- **While working**: unstaged — leave every change unstaged until the story or fix is finished; the user stages what they have read, and /sdd-finish commits
- **Message**: one plain English sentence saying what changed, as the history does; a story's is `CORE Story 4: <title>`
- **Handoff notes**: committed — a story's handoff note is committed with its work, so another machine resumes from it; with **While working** unstaged, it waits in the working tree with the rest of the work
- **Co-Authored-By**: yes — end each commit with the agent's Co-Authored-By line

## Finishing

- **Story**: squash-merge into the phase branch
- **Phase**: fast-forward `develop` to it, then `develop`
- **Pull request**: none
- **Branch after finishing**: local and remote — delete the landed story or fix branch locally and on the remote
