---
kind: script
id: sdd-smell
description: Keep the code smell record — take the snapshot of what is left to assess, note a file left out, write a file's result; changes no other file.
executionPath: ./smell.mjs
---

The record /sdd-code-smell keeps, `code-smell.json` in the spec folder
`.sdd/settings.json` names (`"specFolder"`, `specs` when there is none). Node
20 or later, nothing else; run from the repository's root.

```bash
node .cw/out/script/sdd-smell/smell.mjs snapshot                 # "<hash>  <path>" of each file to assess
node .cw/out/script/sdd-smell/smell.mjs snapshot --rescan        # and the ones whose hash is unchanged
node .cw/out/script/sdd-smell/smell.mjs leave '<path>' '<why>'   # note a file left out
node .cw/out/script/sdd-smell/smell.mjs record '<path>' <hash>   # write the result of a good file
node .cw/out/script/sdd-smell/smell.mjs record '<path>' <hash> - <<'FINDINGS'   # and of one with findings
[{ "rule": "<rule id>", "line": 3, "says": "<what is wrong>" }]
FINDINGS
```

**snapshot** lists what git tracks or would add, on stdout, the counts on
stderr; what git ignores is not in it. It leaves out the record itself, a link
or a submodule, and a name that is not UTF-8 or holds a line break, each noted
with why; a file left out whose hash is unchanged, which comes back when it
changes; and an entry whose hash matches, unless `--rescan` asks for it. It
drops the entry of a file that is gone. **record** takes the hash the snapshot
printed. Findings come on stdin, never on the command line: they quote text
from the file assessed, which a shell must not read. A path and a why are
repository text too: each goes in single quotes, a `'` in it written `'\''`.
Each write replaces the record whole. The spec folder must lie inside the
repository.

```json
{
  "leftOut": { "vendor.min.js": { "why": "minified, not written here", "hash": "<sha-256>" } },
  "files": {
    "src/a.mjs": { "hash": "<sha-256>", "assessed": "yyyy-mm-dd", "good": false,
      "findings": [{ "rule": "<rule id>", "line": 3, "says": "<what is wrong>" }] }
  }
}
```

Exit 0, or 2 on a request that cannot be met or a record that cannot be read,
the record left as it was.

Its tests, beside it:

```bash
node --test .cw/out/script/sdd-smell/smell.test.mjs
```
