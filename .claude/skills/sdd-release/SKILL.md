---
name: sdd-release
description: "Release this repository: write the next CHANGELOG.md entry, confirm the version, commit it as release v<version>, push develop, then tag v<version> and push the tag. Use when: sdd release; release; cut a release; release a new version."
disable-model-invocation: true
---

This skill belongs to this repository only; it is not part of the charter it
exports. The version lives in `CHANGELOG.md` alone: each release is a
`## <version> — <yyyy-mm-dd>` heading there, and a tag `v<version>` on its
commit. Releases are cut from `develop`, pushed to `origin`.

1. **Check** — stop and say why if any of these fails; fix nothing yourself:
   - the current branch is `develop` — otherwise name the branch, and say it
     must be finished into `develop` first (`/sdd-finish`);
   - the working tree is clean (`git status --porcelain` prints nothing);
   - after `git fetch origin --tags`, `develop` is neither behind nor diverged
     from `origin/develop`.
2. **Gather** — the last release is the highest tag by version
   (`git tag --list 'v*' --sort=-v:refname | head -1`); it must match the top
   heading of `CHANGELOG.md`, or say both and stop. Read what landed since:
   `git log <last tag>..HEAD`, and the stories of `plan.json` marked `Done`
   since then. No commit since the tag: say there is nothing to release and
   stop.
3. **Draft** — propose the next version: the patch bump of the last one
   (`0.1.13` → `0.1.14`), unless what landed breaks how a repository already
   set up works, then propose the minor bump and say why. Draft its entry the
   way the entries below it are written: one bullet per change a user of the
   charter notices, in present tense, commands and paths in backticks; never
   a story id, a refactor no user notices, or a change to this repository's
   own specs, evals or tooling unless the charter it exports changed with it.
4. **Confirm** — show the version, today's date and the drafted entry, and
   ask the user to confirm or correct them. Name what follows: the commit
   `release v<version>`, `git push origin develop`, the tag `v<version>` and
   its push. Nothing is written or pushed before the user answers; apply
   their corrections and ask again until they confirm.
5. **Release** — in this order, stopping at the first command that fails and
   quoting its shortest decisive line:
   1. insert the entry under `# Changelog`, above the last release's heading;
   2. `git add CHANGELOG.md` and `git commit -m "release v<version>"`;
   3. `git push origin develop`;
   4. `git tag -a v<version> -m v<version>` (signed by the repository's git
      configuration, as earlier tags are);
   5. `git push origin v<version>`.

   Never force-push, never move or delete a tag that exists already. A step
   that failed after the commit is not undone: say which steps ran and the
   command that finishes the rest.

Say the version released and the commit its tag points to.
