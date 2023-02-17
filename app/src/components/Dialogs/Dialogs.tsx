import { useState } from "react";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

export const Dialogs = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ width: 100 }}>
        <HvButton onClick={() => setOpen(true)}>Open Dialog</HvButton>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
        <HvDialog open={open} onClose={() => setOpen(false)}>
          <HvDialogTitle customIcon={<Alert iconSize="S" />}>
            Dialog Title
          </HvDialogTitle>
          <HvDialogContent indentContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            feugiat urna nec mauris tempor sodales ac quis massa. Integer eu
            velit mi. In aliquet vehicula nisi id aliquam. Integer luctus
            convallis lorem, vel sodales libero sagittis a. Vestibulum non
            libero sagittis, tempor leo ut, pharetra neque. Quisque imperdiet,
            massa interdum viverra eleifend, orci risus cursus metus, sit amet
            tempus nisl urna sit amet lorem. Nulla luctus orci eu mi viverra, et
            varius urna mollis. Curabitur mollis libero et tortor ultricies
            elementum.
          </HvDialogContent>
          <HvDialogActions>
            <HvButton onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </HvButton>
            <HvButton onClick={() => setOpen(false)}>Agree</HvButton>
          </HvDialogActions>
        </HvDialog>
      </div>
    </div>
  );
};
