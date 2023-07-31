import { HvButton } from "@core/components/Button";
import {
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@core/components/Dialog";

import { useClasses } from "./ConfirmationDialog.styles";

export interface ConfirmationDialogProps {
  title?: string;
  message?: string;
  isOpen?: boolean;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement> | Event) => void;
  onCancel?: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  closeButtonTooltip?: string;
}

export const ConfirmationDialog = ({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  closeButtonTooltip,
}: ConfirmationDialogProps) => {
  const { classes } = useClasses();

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      onCancel?.();
    }
  };

  return (
    <HvDialog
      classes={{ paper: classes.paper }}
      open={isOpen}
      onClose={handleClose}
      firstFocusable="confirmation-dialog-cancel"
      buttonTitle={closeButtonTooltip}
    >
      <HvDialogTitle variant="warning">{title}</HvDialogTitle>
      <HvDialogContent indentContent>{message}</HvDialogContent>
      <HvDialogActions>
        <HvButton variant="primaryGhost" onClick={onConfirm}>
          {confirmButtonLabel}
        </HvButton>
        <HvButton
          id="confirmation-dialog-cancel"
          variant="primaryGhost"
          onClick={() => onCancel?.()}
        >
          {cancelButtonLabel}
        </HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};
