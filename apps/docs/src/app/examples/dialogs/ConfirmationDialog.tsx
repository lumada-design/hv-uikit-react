import { useState } from "react";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HvDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <HvDialogTitle variant="error">Are you sure?</HvDialogTitle>
        <HvDialogContent>This action cannot be undone.</HvDialogContent>
        <HvDialogActions>
          <HvButton variant="secondarySubtle" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
          <HvButton
            variant="negative"
            onClick={() => {
              setOpen(false);
            }}
          >
            Confirm
          </HvButton>
        </HvDialogActions>
      </HvDialog>
      <HvButton variant="negativeSubtle" onClick={() => setOpen(true)}>
        Delete Account
      </HvButton>
    </>
  );
}
