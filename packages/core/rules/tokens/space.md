---
id: tokens/space
title: Use spacing tokens, never raw pixel values
components: []
enforcement: checked
status: example
---

## Rule

Margins, padding and gaps use the spacing tokens `xxs` (4px), `xs` (8px),
`sm` (16px), `md` (24px), `lg` (48px), `xl` (80px): as UnoCSS utilities
(`p-sm`, `gap-md`, `mt-xs`) in markup, or `theme.space.*` in styles. Component
spacing props take the same tokens. Never write pixel values for spacing.

## Rationale

The spacing scale is what makes screens built by different teams line up. A
raw `24px` matches `md` today and silently diverges when the scale changes.

## Do

```tsx
<div className="flex flex-col gap-md p-md">...</div>
<HvGrid container spacing="sm">...</HvGrid>
```

## Don't

```tsx
<div style={{ padding: "24px", gap: "16px" }}>...</div>
<div className="p-[24px]">...</div>
```
