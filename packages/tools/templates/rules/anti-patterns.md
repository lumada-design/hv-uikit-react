# HV UI Kit Component Rules

## Prefer using UI Kit components

- **Id:** components/prefer-uikit
- **Rule:** Prefer an existing UI Kit component over native controls, third-party widgets, or custom implementations of the same interaction. Consult the component inventory and contract first. Native semantic elements and UnoCSS layout wrappers are appropriate where they do not recreate a UI Kit widget; application-logic wrappers may compose UI Kit components.
- **Rationale:** Reusing components preserves accessibility, behavior, and theme consistency without duplicating maintenance.
- **Components:** HvButton, HvInput, HvSelect, HvTable, HvDialog, HvBanner, HvSnackbar, HvTypography
- **Enforcement:** checked
- **Fix:** Find the matching component in the inventory, retrieve its contract, and replace the duplicate widget while preserving application handlers and accessible names. If no component meets the requirement, document that gap rather than forcing an unsuitable replacement.

Examples:

```diff
- <div onClick={save}>Save</div>
+ <HvButton onClick={save}>Save</HvButton>
```

## Self-evident disabled actions

- **Id:** components/disabled-reason
- **Rule:** Explain why an action is disabled when the reason is not otherwise clear. Make the explanation available without requiring hover or focus on the disabled control.
- **Rationale:** Users need to know how to make progress; disabled controls may not be keyboard-focusable.
- **Components:** HvButton, HvTypography
- **Enforcement:** context-only
