# Layout Rules

## Introduction

Rules for page and section layout, spacing, and loading states. Read these before building any page or section.

## Grid

Build page and section layouts with `HvGrid` to keep them aligned and consistent. Do not use ad-hoc `display: flex`, `display: grid`, or absolute positioning for layout. Control gaps with the `spacing`, `rowSpacing`, and `columnSpacing` props.

Examples:

```diff
- <div style={{ display: "grid", gap: 16 }}>{content}</div>
+ <HvGrid container spacing={2}>{content}</HvGrid>
```

## Container

Use `HvContainer` to center and bound the main content of a page or section. Use one container per page or section region; do not wrap every component in one. A shared content boundary keeps related sections aligned without unnecessary nesting.

Examples:

```diff
- <><HvContainer>{header}</HvContainer><HvContainer>{content}</HvContainer></>
+ <HvContainer>{header}{content}</HvContainer>
```

## Spacing

Use space tokens for all gaps, margins, and padding: `xxs` (4px), `xs` (8px), `sm` (16px), `md` (24px), `lg` (48px), and `xl` (80px). Never use raw pixel values. A shared spacing scale keeps layouts consistent.

Examples:

```diff
- <div style={{ padding: "24px", marginBottom: "16px" }}>{content}</div>
+ <div style={{ padding: theme.space.md, marginBottom: theme.space.sm }}>{content}</div>
```

## Consistency

Keep spacing and layout structure consistent across sibling sections of the same page to make it easier to scan.

Examples:

```diff
- // Give sibling sections different gaps and unrelated layout structures.
+ // Use the same spacing and layout structure across sibling sections.
```

## Loading states

Show loading feedback while data is being fetched or a process is running.

- Use `HvSkeleton` for initial content loads, sized and shaped like the content that will replace it (`variant="text"` for lines, `variant="circle"` for avatars, `variant="square"` for images) so the layout does not shift.
- Use `HvLoading` for an in-progress process with no known final shape, such as submitting a form or running a query.
- Use `HvLoadingContainer` to overlay existing content while a process runs.

Examples:

```diff
- // Leave the region blank during initial loading or remove existing content during a process.
+ // Use content-shaped HvSkeleton placeholders for initial loads.
+ // Use HvLoading for a process with no known final shape.
+ // Use HvLoadingContainer to overlay existing content while a process runs.
```
