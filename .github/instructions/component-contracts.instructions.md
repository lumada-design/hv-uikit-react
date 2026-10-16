---
applyTo: "packages/core/{src/**/*.contract.ts,rules/**/*.md}"
name: Component contracts and design rules
description: How to write component contracts and design rules that power the agent guide, lookups and checks
---

Design decisions live in two places, both in `packages/core`. This is the
authoring how-to; the decisions and their trade-offs are in
`docs/adr/0001-design-rules-and-metadata.md`, which wins if the two disagree.

## Component contracts — `src/<C>/<C>.contract.ts`

How one component is meant to be used. Typed against the component's props, so
a variant or prop that does not exist is a compile error.

```ts
import type { HvContract } from "../types/contract";
import type { HvButtonProps } from "./Button";

export const contract = {
  name: "HvButton",
  parts: [], // exported sub-components to compose with it
  rules: ["tokens/color"], // design rule ids that apply
  variants: { primary: "The main action; one per context." },
  states: {
    disabled: "Leaves the tab order unless focusableWhenDisabled is set.",
  },
  tokens: { color: "Semantic variants or theme tokens only." },
  antiPatterns: [
    { id: "variant", dont: "Invent variant names.", why: "…", instead: "…" },
  ],
  a11y: { role: "button", requirements: ["Needs an accessible name."] },
} as const satisfies HvContract<HvButtonProps>;
```

- Only `import type`. Contract files are build-time only and must not be imported by component code or `index.ts`.
- Do not restate props, types or defaults: they are extracted from the component with docgen.
- Do not restate a design rule: name its id in `rules` (or reference it, "see `destructive/confirm`").
  The rule ↔ component link may be written in the contract's `rules` or the rule's `components`; the build publishes both ways.
- Write the component description as JSDoc on the component; it becomes `purpose` unless `purpose` is set.
- `variants` explains meaning, not appearance: "the main action", not "filled".
- Anti-pattern ids are kebab-case and unique per component; their full id is `HvButton/variant`.
- Use `props.only` / `props.hide` when extraction over-reports (e.g. props inherited from MUI).

## Design rules — `rules/<group>/<name>.md`

Decisions that span components. The id is the path: `rules/tokens/color.md` → `tokens/color`.

```md
---
id: tokens/color
title: Use color tokens, never raw color values
components: [] # exported component names the rule is about
enforcement: checked # checked (a check enforces it) | context (guidance)
status: example # example (not yet reviewed by Product Design) | approved
---

## Rule

## Rationale

## Do

## Don't
```

All four sections are required. Do/Don't hold real, minimal code.

## Build

`npm run build:agents -w packages/core` (part of `build`) writes
`dist/agents/metadata.json` and `dist/agents/guide.md`. It fails on type errors
in contracts, unknown variants, props, rule ids, components or parts, and
malformed rules. `npm run check:agents -w packages/core` validates without writing.
