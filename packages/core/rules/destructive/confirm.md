---
id: destructive/confirm
title: Confirm destructive actions in a dialog
components:
  [HvDialog, HvDialogTitle, HvDialogContent, HvDialogActions, HvButton]
enforcement: checked
fix: "Open a plain HvDialog (no status variant) from the trigger; run the action from its negativeGhost confirm button, with a secondaryGhost cancel."
status: example
---

## Rule

Every destructive action (delete, remove, discard, any irreversible change) is
confirmed in a plain `HvDialog` before it runs. The trigger only opens the
dialog. The dialog title names the action and the item, the content says what
will be lost, and `HvDialogActions` holds the confirm button (`variant="negativeGhost"`)
and a cancel button (`variant="secondaryGhost"`). Do not give the confirmation
dialog a status `variant`: `success`, `error` and `warning` report the state of
something, not a decision the user is about to make.

## Rationale

The user needs one chance to stop before data is lost, and the confirmation has
to look like a decision, not like an alert. A `warning` status bar on a delete
confirmation reads as "something went wrong" and trains users to dismiss it.

## Do

```tsx
<HvButton variant="negativeGhost" onClick={() => setOpen(true)}>
  Delete
</HvButton>
<HvDialog open={open} onClose={() => setOpen(false)} aria-labelledby="delete-title">
  <HvDialogTitle id="delete-title">Delete "Q3 revenue"?</HvDialogTitle>
  <HvDialogContent>The dataset and its 12 saved views will be removed.</HvDialogContent>
  <HvDialogActions>
    <HvButton variant="negativeGhost" onClick={remove}>Delete</HvButton>
    <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>Cancel</HvButton>
  </HvDialogActions>
</HvDialog>
```

## Don't

```tsx
// Runs the deletion straight from the trigger
<HvButton onClick={remove}>Delete</HvButton>

// Confirmation styled as a warning status
<HvDialog open={open} variant="warning" onClose={close}>...</HvDialog>
```
