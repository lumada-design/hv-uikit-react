# ADR 0001 — Design rules, component metadata and how tools consume them

- Status: proposed
- Story: HVUIKIT-7481 follow-up — "Design rules, metadata and tooling architecture"
- Builds on: `rd/agents` (contract tags, `@pentaho/uikit-tools`), `spike/hvuikit-7481-component-context` (colocated typed docs, docgen extraction, baseline scorer)

## Context

The `rd/agents` POC proved the delivery path: contract tags on components, a
`component-metadata.json`, an `init` that writes guidance into a consumer repo,
an MCP server and a `validate` command. It also showed where it breaks:

- Contracts are free text in JSDoc, parsed by regex. Nothing checks them against
  the component types, so a contract can name a variant that does not exist.
- Metadata has no props.
- The extractor writes `dist/component-metadata.json` **before** `vite build`,
  which empties `dist/` — so the published package does not contain it.
- The MCP server reads `../../../core/dist/...` relative to its own file, so it
  only works inside this repo. It is registered for Copilot only.
- `init` copies the whole guide into the consumer repo. Upgrading the UI Kit
  leaves the copy stale until someone re-runs `init`.
- Rules exist in three places with no ids: rule templates in `packages/tools`,
  anti-patterns inside component JSDoc, and hand-written checks.

The baseline spike adds two findings that shape this design: agents mostly fail
on _wrong_ context (v6 API from training data), and context pinned to the
installed version is the only kind that cannot drift from the code.

## Decision

### 1. Two sources, both in `packages/core`, both versioned with the components

| What                | Where                                   | Format                          | Owner                                    |
| ------------------- | --------------------------------------- | ------------------------------- | ---------------------------------------- |
| Design rules        | `packages/core/rules/<group>/<name>.md` | Markdown + YAML frontmatter     | Product Design decides; UI Kit maintains |
| Component contracts | `packages/core/src/<C>/<C>.contract.ts` | TypeScript, typed by props      | UI Kit                                   |
| Props               | `packages/core/src/<C>/<C>.tsx`         | extracted (docgen), not written | UI Kit                                   |

**Design rules** are decisions that span components ("confirm destructive
actions", "use spacing tokens"). One file per rule; the id is the path
(`rules/destructive/confirm.md` → `destructive/confirm`). Markdown because
Product Design will contribute rules and do/don't examples are code.

**Component contracts** say how one component is meant to be used: what each
variant means, what state props imply, anti-patterns, a11y. They are typed
against the component's props, so the compiler rejects a variant or prop that
does not exist. Contract anti-patterns carry ids too (`HvButton/variant`), so
component-level checks report by id like design rules do. Component rules are
guidance unless a check reports them. A contract states component-specific
usage only; when a design rule covers something, the contract names the rule id
instead of restating it.

**Props** are not written by hand. The build runs `react-docgen-typescript`
with the same options as the docs site and publishes the props declared in UI
Kit source, including those inherited from other core components (`HvCheckBox`
from `HvBaseCheckBox`) and excluding anything from `node_modules` (React's HTML
attributes, MUI's props). `props.only`/`props.hide` narrow further where needed.
Contracts are validated against these published props, so a contract cannot
describe a prop that lookups do not show.

**The rule ↔ component link** can be written on either side: a contract's
`rules`, or a rule's `components`. The build publishes the union on both, so a
lookup gives the same answer whichever side an author used.

Why not keep JSDoc tags: they cannot be type-checked and need a format-specific
parser. What we give up is the contract in the IDE hover; the component
description stays in JSDoc (docgen reads it), and the rest is one lookup away.

Why not `.doc.ts` from the spike: same idea, different field names. `.contract.ts`
keeps the vocabulary the team already uses and absorbs the spike's `props.only`.
`usage`/`decisions` from the spike can be added to the contract type when needed.

### 2. One build step produces everything consumers read

`packages/core/scripts/build-agents.ts` runs **after** `vite build` and writes:

- `dist/agents/metadata.json` — components (props + contract + parts + rule ids)
  and rules, deterministic (no timestamps), keyed by name/id. Parts that a
  contract names (e.g. `HvTableSection`) get a props-only entry, so a rule that
  requires a part can always be followed by a lookup of that part.
- `dist/agents/guide.md` — the always-loaded guide, generated from the same data.

It fails the build when:

- a contract does not type-check against its component (non-existent variant,
  state prop or `props.only` entry);
- a contract variant or state is not among the published props and values;
- a contract or rule references a component or part that core does not export;
- a contract references a rule id that does not exist;
- a contract cannot be loaded;
- a rule is missing a required field or section, or its id does not match its path.

Output paths use forward slashes, and rules are read with CRLF normalised, so
the result is the same on every OS. The script runs TypeScript directly and
needs Node ≥ 22.18.

Exported as `@pentaho/uikit-react-core/agents/*`.

### 3. How each consumer uses the data

| Consumer                  | Reads                                           | Does                                                                                                                                                     | Never                                   |
| ------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Guide** (always loaded) | `dist/agents/guide.md` in the installed package | Lists rule ids + titles, component names + purpose, and how to look up details                                                                           | Holds rule text or props                |
| **Lookups**               | `metadata.json` of the installed version        | `uikit-tools info <Component>`, `uikit-tools rule <id>`; MCP `get_component`, `get_rule`, `list_components`, `list_rules` — one shared core, same result | Read a repo-relative path               |
| **Skills**                | lookups + checks                                | Workflows: which lookups to run, when to run checks, how to fix by rule id                                                                               | Copy rule text or props                 |
| **Checks**                | rule ids + rule text from metadata              | Enforce rules marked `checked`; report `file:line severity rule-id` plus the rule's title and text                                                       | Carry their own message text for a rule |
| **People**                | the same metadata                               | Read rule text in check output and in lookups (docs-site rendering is a follow-up)                                                                       | —                                       |

`init` writes a **pointer** to the guide in `AGENTS.md` (plus `CLAUDE.md`
importing it for Claude Code), and the MCP config for the host. The pointer is
the path through the nearest `node_modules/@pentaho/uikit-react-core` (which
may be in a workspace root), never a resolved symlink, so upgrading the UI Kit
updates the guide with no re-run, also under pnpm. Lookups reload the metadata
when it changes, so a running MCP server follows an upgrade.

### 4. Rule schema

Frontmatter: `id`, `title`, `components` (exported names), `enforcement`
(`checked` | `context`), `status` (`example` | `approved`).
Body sections, all required: `## Rule`, `## Rationale`, `## Do`, `## Don't`.

`checked` means a check is expected to enforce it — checks cover only some of
them today, and the guide says so; `context` means it is guidance only. `status: example` marks rules written by UI Kit before Product
Design review — all rules start there.

## Consequences

- Contract authors get compile errors in the editor, not at extraction time.
- Docs and tools share one docgen configuration. The docs site still parses on
  its own; switching it to read `metadata.json` makes it a single source in
  practice (follow-up).
- Existing JSDoc contract tags (Button, Avatar, Badge, Card, CheckBox, Dialog,
  Loading, Skeleton, Table) are migrated to `.contract.ts`; the tags are removed
  so there is one source. Generic rule templates in `packages/tools/templates/rules`
  become design rules; their form-label and typography guidance has no rule yet.
- Contract files are build-time only: not exported from `index.ts`, not bundled
  (nothing imports them), and type-only imports keep them dependency-free.
- (Superseded by `uikit-tools check`, HVUIKIT checks story.) `validate` keeps the POC's 8 checks; each now reports a rule id, a `severity`
  (error/warn/info — not to be confused with a rule's enforcement) and takes
  allowed values from the metadata. Tags are read lexically, not with an AST. Writing checks for the `checked` rules is a
  separate story — the list-page run (`docs/agents/runs/2026-10-16-list-page.md`)
  shows today's checks cannot tell an on-system page from an off-system one.
- The tools keep their own copy of the metadata type (core is only a peer
  dependency); a type test fails typecheck if it drifts from what core writes.
- Rule and contract examples are not type-checked yet; compiling the Do
  examples would catch drift such as a required prop missing from an example.

## Out of scope

Publishing, CI wiring, more components, new checks, rendering rules on the docs
site, Figma Guidelines generated from the rules (natural next projection).
