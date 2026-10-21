# HV UI Kit Layout Rules

Rules for page and section layout, spacing, and loading states. Read these before building any page or section.

## Grid

- **Id:** layout/page
- **Rule:** Build page and section layouts with `HvGrid`. Do not use ad-hoc `display: flex`, `display: grid`, or absolute positioning for layout. Control gaps with the `spacing`, `rowSpacing`, and `columnSpacing` props.
- **Rationale:** A shared grid keeps page and section layouts aligned and consistent.
- **Components:** HvGrid
- **Enforcement:** checked
- **Fix:** Replace ad-hoc layout styles with `HvGrid` and control gaps through its spacing props.

```diff
- <div style={{ display: "grid", gap: 16 }}>{content}</div>
+ <HvGrid container spacing={2}>{content}</HvGrid>
```

## Container

- **Id:** layout/container
- **Rule:** Use `HvContainer` to center and bound the main content of a page or section. Use one container per page or section region; do not wrap every component in one.
- **Rationale:** A shared content boundary keeps related sections aligned without unnecessary nesting.
- **Components:** HvContainer
- **Enforcement:** checked
- **Fix:** Wrap the page or section region in one `HvContainer` instead of wrapping individual components.

```diff
- <><HvContainer>{header}</HvContainer><HvContainer>{content}</HvContainer></>
+ <HvContainer>{header}{content}</HvContainer>
```

## Spacing

- **Id:** layout/spacing
- **Rule:** Use space tokens for all gaps, margins, and padding: `xxs` (4px), `xs` (8px), `sm` (16px), `md` (24px), `lg` (48px), and `xl` (80px). Never use raw pixel values.
- **Rationale:** A shared spacing scale keeps layouts consistent.
- **Components:** none
- **Enforcement:** checked
- **Fix:** Replace raw spacing values with the corresponding space tokens.

```diff
- <div style={{ padding: "24px", marginBottom: "16px" }}>{content}</div>
+ <div style={{ padding: theme.space.md, marginBottom: theme.space.sm }}>{content}</div>
```

## Consistency

- **Id:** layout/consistency
- **Rule:** Keep spacing and layout structure consistent across sibling sections of the same page.
- **Rationale:** Consistent sibling sections make the page easier to scan.
- **Components:** HvGrid, HvContainer
- **Enforcement:** context-only

```diff
- // Give sibling sections different gaps and unrelated layout structures.
+ // Use the same spacing and layout structure across sibling sections.
```

## Loading States

- **Id:** data/states
- **Rule:** Show loading feedback while data is being fetched or a process is running. Use `HvSkeleton` for initial content loads, sized and shaped like the content that will replace it (`variant="text"` for lines, `variant="circle"` for avatars, `variant="square"` for images) so the layout does not shift. Use `HvLoading` for an in-progress process with no known final shape, such as submitting a form or running a query. Use `HvLoadingContainer` to overlay existing content while a process runs.
- **Rationale:** Loading feedback communicates progress, while content-shaped placeholders prevent layout shifts.
- **Components:** HvSkeleton, HvLoading, HvLoadingContainer
- **Enforcement:** context-only

```diff
- // Leave the region blank during initial loading or remove existing content during a process.
+ // Use content-shaped HvSkeleton placeholders for initial loads.
+ // Use HvLoading for a process with no known final shape.
+ // Use HvLoadingContainer to overlay existing content while a process runs.
```
