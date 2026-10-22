# Form Rules

## Introduction

Forms must make it clear what information users need to provide and how to identify each control.

## Labelled form controls

Give every form control an accessible name using its `label`, `aria-label`, or `aria-labelledby`. Prefer visible labels so users can identify fields both visually and through assistive technology. Placeholders are hints, not labels.

Examples:

```diff
- <HvInput placeholder="Email" />
+ <HvInput label="Email" type="email" required />
+ <HvCheckBox label="Remember me" />
+ <HvInput aria-label="Search" placeholder="Type a query" />
```
