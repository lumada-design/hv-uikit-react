---
id: tokens/color
title: Use color tokens, never raw color values
components: []
enforcement: checked
status: example
---

## Rule

Every color comes from the theme: a component's semantic variant or color prop
(`variant="negativeGhost"`, `color="positive"`), a UnoCSS color utility
(`text-secondary`, `bg-bgContainer`), or `theme.colors.*` for the rare dynamic
style. Never write hex, `rgb()`, `hsl()` or named colors.

## Rationale

Raw values bypass the theme, so they break in dark mode and when Product Design
adjusts the palette. Semantic tokens also carry meaning (`negative`, `warning`)
that a hex value does not.

## Do

```tsx
<HvButton variant="negativeGhost">Delete</HvButton>
<HvTypography className="text-secondary">Last updated today</HvTypography>
<div style={{ borderColor: theme.colors[statusColor] }} />
```

## Don't

```tsx
<HvButton style={{ color: "#d11e1e" }}>Delete</HvButton>
<span style={{ color: "rgb(90, 90, 90)" }}>Last updated today</span>
<div style={{ background: "white" }} />
```
