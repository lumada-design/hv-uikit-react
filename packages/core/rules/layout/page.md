---
id: layout/page
title: Pages start with HvGlobalActions inside a padded page container
components: [HvGlobalActions, HvContainer]
enforcement: checked
status: example
---

## Rule

A page is one vertical stack with page padding from a spacing token
(`p-md`, or `px-md pb-md`) and gaps between sections from spacing tokens
(`gap-md`). Its first child is `HvGlobalActions` with the page title and the
page-level actions as children. `HvGlobalActions` sits inside the padded
container, so it lines up with the content below it; do not place it outside
the padding or remove its own padding. Use `variant="section"` only to head a
section within the page.

## Rationale

`HvGlobalActions` styles its bar but not the page around it. Without the page
inset the bar touches the viewport edge while the content does not, and pages
built separately end up with different edges and gaps. One stack with token
padding gives every page the same frame.

## Do

```tsx
<div className="flex flex-col gap-md p-md">
  <HvGlobalActions title="Datasets" backButton={false}>
    <HvButton variant="primary" startIcon={<Add />}>
      New dataset
    </HvButton>
  </HvGlobalActions>
  <HvTableSection>...</HvTableSection>
</div>
```

## Don't

```tsx
<>
  <HvGlobalActions title="Datasets" />
  <div style={{ padding: "24px" }}>...</div>
</>

<HvGlobalActions title="Datasets" classes={{ wrapper: "p-0" }} />
```
