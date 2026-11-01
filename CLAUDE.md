## Reporting and token economy
- Work token-efficiently: read only the files and sections a task needs; prefer grep/targeted reads over full-file reads; don't re-read files already read in this session; no exploratory scans unless asked.
- Step 1 reports: max ~15 lines. List only (a) insertion points that differ from the handoff, (b) conflicts or errors found, (c) decisions needed, each as one line. Don't restate the handoff or list things that match it.
- Step 2 / commit reports: one line with the hash, then only deviations, problems or decisions. Format: "Pushed <hash>. Deviations: … / none. Decisions needed: … / none." Don't list what was added, the checks passed, character counts or line numbers unless asked.
- Verification: run the checks the handoff specifies; report only failures.
- Ask before going beyond the handoff; don't propose optional extras unless they fix a real problem.
