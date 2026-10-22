# UI Kit Action Rules

## Introduction

Actions must communicate their consequences and protect users from accidental data loss.

## Confirm destructive actions

Confirm destructive actions (delete, remove, discard, or irreversible changes) in an `HvDialog` before mutating data. Name the affected item and explain the consequence.

- The trigger only opens the dialog; only the explicit confirmation performs the change.
- Cancel, Escape, and dismissal leave data unchanged.
- Use `HvButton` with `variant="negativeGhost"` for the destructive trigger and a clearly named destructive confirmation action.

Examples:

```diff
- <HvButton variant="negativeGhost" onClick={deleteAsset}>Delete asset</HvButton>
+ <HvButton variant="negativeGhost" onClick={() => setConfirmOpen(true)}>Delete asset</HvButton>
- // Delete from the dialog's onClose handler.
+ // Delete only from the explicit confirmation handler; onClose only closes the dialog.
```
