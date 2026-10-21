# HV UI Kit Workflow and Rule Format

**Rule format**

Every rule in these templates implements the `GlobalRule` contract defined in `packages/tools/src/utils/metadata.ts`. Use a level-two heading containing the stable ID, then the fields below in order. Do not add unstructured requirements outside a rule record. Examples may be code snippets or concrete scenarios; each rule needs at least one Do and one Don't example.

- **Id** (`id`): Unique, stable `category/name` identifier.
- **Rule** (`rule`): Specific, actionable requirement.
- **Rationale** (`rationale`): Why the rule matters.
- **Components** (`components`): Comma-separated component names; `none` represents an empty list for component-independent rules.
- **Examples** (`do` and `dont`): One fenced `diff` code block after Components, with `+` lines for compliant examples and `-` lines for noncompliant examples. Include both signs; use comments for scenario descriptions and prefix every line of multiline snippets.
- **Enforcement** (`enforcement`): Exactly `checked` or `context-only`.
- **Fix** (`fix`): Required remediation instructions for checked rules; omitted for context-only rules.

**Enforcement semantics**

- `checked`: a concrete requirement to check during review or with an applicable checker. A violation needs the supplied fix. This classification does **not** claim that the current CLI implements the check, nor that the fix is automatic.
- `context-only`: advisory guidance requiring product or runtime context. It is not an automatic validation failure and has no Fix field.

These global rule IDs are separate from component-extracted `ValidationRule` records (`rule`, `failureMessage`, `enforcement: error | warn | info`) and runtime validator IDs. The current CLI only checks a subset of `HvButton` and `HvAvatar` usage, including variants, some raw colors, selected/toggle semantics, image alternatives, and icon-only labels. It does not check all global rules, spacing, date formatting, destructive control flow, or data states. A clean CLI result is not proof of compliance with this guide.

## workflow/contracts

- **Id:** workflow/contracts
- **Rule:** Before implementing a component, retrieve its contract using the registered MCP tool `get_component_contract`. Use `list_components` to discover the inventory. Check supported props, required boolean flags, variants, state semantics, token constraints, accessibility requirements, and anti-patterns rather than guessing.
- **Rationale:** Component APIs vary, and visually plausible code may omit a required flag or use an unsupported prop or variant.
- **Components:** none

```diff
- // Invent a variant or assume every component supports the same props.
- // Pass MCP tool calls as terminal arguments to uikit-tools mcp (a stdio server).
+ // Call the agent's registered MCP tools before implementing a form:
+ list_components({ limit: 10, offset: 0 })
+ get_component_contract({ component: "HvInput" })
+ // Consult component stories for usage examples.
```

- **Enforcement:** context-only

## workflow/validate

- **Id:** workflow/validate
- **Rule:** After implementation and before committing, run `npx uikit-tools validate 'src/**/*.tsx'`, resolve reported violations, and review the checked rules manually where no checker exists. Review context-only guidance against the actual product flow.
- **Rationale:** Automated checks catch only the patterns they implement; behavior, domain meaning, and runtime states require additional review.
- **Components:** none

```diff
- // Treat "All validations passed" as proof that every rule or component was checked.
- // Claim the CLI validates all spacing and accessibility requirements.
+ // Query the relevant contract, correct reported violations, and rerun validation.
+ // Separately verify destructive confirmation, date formatting, layout, tokens, and component choice.
```

- **Enforcement:** context-only
