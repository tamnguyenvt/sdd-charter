SDD is a vendor charter and must keep its settings within the repository, including personal settings.

**Why:** The developer rejected a settings file under the user's home directory because the charter's scope is this repository.

**How to apply:** Store personal preferences in `.sdd/settings.local.json` and ignore it through `.sdd/.gitignore`; do not create machine-wide SDD configuration.
