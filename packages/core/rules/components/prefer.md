---
id: components/prefer
title: Use UI Kit components instead of plain HTML or look-alikes
components: [HvButton, HvInput, HvSelect, HvTable, HvCard, HvTag, HvTypography]
enforcement: checked
status: example
---

## Rule

When a UI Kit component exists for an element, use it: `HvButton` not
`<button>`, `HvInput` not `<input>`, `HvSelect` not `<select>`, `HvTable` parts
not `<table>`. Content shaped as a card is an `HvCard` with `HvCardHeader` and
`HvCardContent`, not a styled `div`. Labels, chips and status pills are `HvTag`,
not styled `span`s. Icons come from `@pentaho/uikit-react-icons`; never use
emoji as icons.

## Rationale

Look-alikes copy today's appearance but not behaviour, accessibility or future
design changes. Emoji render differently per platform, cannot be themed and
are announced literally by screen readers.

## Do

```tsx
<HvCard bgcolor="bgContainer">
  <HvCardHeader title="Sales pipeline" />
  <HvCardContent>
    <HvTag label="Certified" type="semantic" color="positive" />
  </HvCardContent>
</HvCard>
<HvButton icon aria-label="Refresh"><Refresh /></HvButton>
```

## Don't

```tsx
<div className="rounded shadow p-sm">
  <h3>Sales pipeline</h3>
  <span className="pill">Certified</span>
</div>
<button onClick={reload}>🔄</button>
```
