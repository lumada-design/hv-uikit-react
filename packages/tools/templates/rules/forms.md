# HV UI Kit Form Rules

## Labelled form controls

- **Id:** forms/label
- **Rule:** Give every form control an accessible name using its `label`, `aria-label`, or `aria-labelledby`. Prefer visible labels; placeholders are hints, not labels.
- **Rationale:** Users need to identify a field both visually and through assistive technology.
- **Components:** HvInput, HvSelect, HvCheckBox, HvRadio, HvDatePicker
- **Enforcement:** context-only

```diff
- <HvInput placeholder="Email" />
+ <HvInput label="Email" type="email" required />
+ <HvCheckBox label="Remember me" />
+ <HvInput aria-label="Search" placeholder="Type a query" />
```
