import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@core/components";
import { ClassNames } from "@emotion/react";

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
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onCancel?.();
    }
  };

  return (
    <ClassNames>
      {({ css }) => (
        <HvDialog
          classes={{ paper: css({ width: 500 }) }}
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
      )}
    </ClassNames>
  );
};
