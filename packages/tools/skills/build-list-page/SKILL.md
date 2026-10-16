---
name: build-list-page
description: Build a page that lists records (a table of items with page actions, row actions, status and dates) with the HV UI Kit. Use when asked for a list, index, overview or management page of entities such as datasets, users or jobs.
---

# Build a list page with the HV UI Kit

This skill is a workflow. It does not contain UI Kit rules or props: those come
from the installed UI Kit through lookups, so they always match its version.
Never copy rule text into the code or into notes; cite rule ids instead.

Use the CLI (`npx uikit-tools …`) or the equivalent `hv-uikit` MCP tools
(`get_component`, `get_rule`, `list_rules`) — they return the same result.

## 1. Read the guide

Read the UI Kit agent guide that `AGENTS.md` points to, if it is not already in
context. Note which rule ids exist.

## 2. Look up what a list page is made of

Run these before writing code, and keep the answers open while you work:

```bash
npx uikit-tools info HvGlobalActions   # page header and page actions
npx uikit-tools info HvTable           # the table and its parts
npx uikit-tools info HvPagination
npx uikit-tools info HvEmptyState      # empty and error states
npx uikit-tools info HvSkeleton        # first load
```

Then look up the components the request needs beyond that, for example:
`HvTag` for status, `HvButton` and `HvDialog` for row actions, `HvDatePicker`
for date filters, `HvCard` for a card layout instead of a table.

## 3. Read every rule the components point to

Each `info` result ends with "Design rules that apply". Run `rule <id>` for each
distinct id. A list page usually touches at least:

```bash
npx uikit-tools rule layout/page
npx uikit-tools rule data/states
npx uikit-tools rule components/prefer
```

Look up `destructive/confirm` when rows can be deleted, `date/format` when a
column shows dates, `status/semantic-color` when a column shows status, and the
`tokens/*` rules before writing any style.

## 4. Build

- Follow the structure the rules and component lookups describe; take prop
  names and variant values only from the `info` output.
- Handle every state that `data/states` requires, not only the loaded one.
- When a lookup and your own knowledge disagree, the lookup wins: it describes
  the installed version.

## 5. Check and fix by rule id

```bash
npx uikit-tools check
```

For each failure, run `npx uikit-tools rule <id>` with the reported id, fix the
code, and run the check again until there are no errors. Checks catch only part of
what the rules require (they read one file at a time and only what the code makes
explicit), so a clean run is not enough: before finishing, go through the rule
ids from step 3 and confirm the code follows each one.

## 6. Report

End with the files you changed and the rule ids you applied, e.g.
"Applied: layout/page, data/states, destructive/confirm, date/format".
