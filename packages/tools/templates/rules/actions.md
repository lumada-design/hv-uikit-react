# HV UI Kit Actions Rules

## destructive/confirm

- **Id:** destructive/confirm
- **Rule:** Confirm destructive actions (delete, remove, discard, or irreversible changes) in an `HvDialog` before mutating data. The trigger only opens the dialog; confirmation performs the change; cancel, Escape, and dismissal leave data unchanged. Use `HvButton` with `variant="negativeGhost"` for the destructive trigger and a clearly named destructive confirmation action.
- **Rationale:** A deliberate decision prevents accidental data loss and makes the consequence clear.
- **Components:** HvButton, HvDialog, HvDialogTitle, HvDialogContent, HvDialogActions
- **Enforcement:** checked
- **Fix:** Move the mutation out of the trigger and dialog dismissal handlers into the explicit confirmation handler. Add the controlled dialog, consequence text, and a non-destructive Cancel action.
