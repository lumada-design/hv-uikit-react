---
id: status/semantic-color
title: Status uses semantic colors and never color alone
components: [HvTag, HvStatusIcon, HvBanner]
enforcement: context
status: example
---

## Rule

Statuses map to semantic colors: `positive` for success or healthy, `warning`
for needs attention, `negative` for failed or blocked, and the neutral default
for informational or unknown. Show status with `HvTag type="semantic"` or
`HvStatusIcon`, always with a text label, so color is never the only signal.
Use the same color for the same status everywhere in the product.

## Rationale

Users learn what each color means; reusing `negative` for a non-error, or a
categorical color for a status, breaks that. Color alone fails users with color
vision deficiencies and in grayscale screenshots.

## Do

```tsx
<HvTag type="semantic" color="positive" label="Published" />
<HvStatusIcon variant="warning" /> <HvTypography>Needs review</HvTypography>
```

## Don't

```tsx
<HvTag type="categorical" color="cat3" label="Failed" />
<span className="dot bg-negative" />  // color with no label
```
