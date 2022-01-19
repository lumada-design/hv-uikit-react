import React from "react";
import PropTypes from "prop-types";

import {
  HvButton,
  HvDialog,
  HvDialogTitle,
  HvDialogContent,
  HvDialogActions,
} from "@hitachivantara/uikit-react-core";

import useStyles from "./styles";

const ConfirmationDialog = ({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  closeButtonTooltip,
}) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
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
        <HvButton category="ghost" onClick={onConfirm}>
          {confirmButtonLabel}
        </HvButton>
        <HvButton id="confirmation-dialog-cancel" category="ghost" onClick={() => onCancel?.()}>
          {cancelButtonLabel}
        </HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  closeButtonTooltip: PropTypes.string,
};

export default ConfirmationDialog;
