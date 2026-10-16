---
id: data/states
title: Data views show loading, empty and error states
components: [HvTable, HvSkeleton, HvLoading, HvLoadingContainer, HvEmptyState]
enforcement: context
status: example
---

## Rule

Any view that fetches data handles four states, not one: loading, empty, error
and loaded. While the first load runs, show `HvSkeleton` shaped like the
content (or `HvLoadingContainer` over a table that keeps its shape). When the
result is empty, show `HvEmptyState` with a title, a message that says why it
is empty, and an action when the user can fix it. When the request fails, show
`HvEmptyState` (or an `HvBanner`) that says what failed and offers a retry.

## Rationale

Designs usually show the loaded state only, so the other three get improvised:
a blank table, a spinner that never stops, an empty page with no way forward.
Handling all four is what makes a data view feel finished.

## Do

```tsx
if (status === "loading")
  return (
    <HvSkeleton
      variant="square"
      width="100%"
      height={240}
      role="progressbar"
      aria-label="Loading datasets"
    />
  );
if (status === "error")
  return (
    <HvEmptyState
      icon={<Fail />}
      title="Couldn't load datasets"
      message={error.message}
      action={
        <HvButton variant="secondaryGhost" onClick={retry}>
          Try again
        </HvButton>
      }
    />
  );
if (rows.length === 0)
  return (
    <HvEmptyState
      icon={<Info />}
      title="No datasets yet"
      message="Create one to start exploring."
      action={<HvButton onClick={create}>New dataset</HvButton>}
    />
  );
return <HvTableSection>...</HvTableSection>;
```

## Don't

```tsx
return <HvTable>{rows.map(renderRow)}</HvTable>; // nothing for loading, empty or error
```
