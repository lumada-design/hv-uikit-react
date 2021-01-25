import React from "react";
import PropTypes from "prop-types";
import { withStyles, Dialog } from "@material-ui/core";
import { HvDialogTitle, HvDialogContent, HvDialogActions } from "@hv/uikit-react-core";
import { dialogStyles } from "./styles";

const CookiesConsentDialog = ({
  classes,
  title,
  description,
  buttons,
  open,
  onClose,
  ...others
}) => {
  return (
    <Dialog
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      BackdropProps={{
        classes: {
          root: classes.background,
        },
      }}
      open={open}
      onClose={onClose}
      {...others}
    >
      <HvDialogTitle>{title}</HvDialogTitle>
      <HvDialogContent>{description}</HvDialogContent>
      <HvDialogActions>{buttons}</HvDialogActions>
    </Dialog>
  );
};

CookiesConsentDialog.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the form composer.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The title of the dialog
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The content of the dialog, can be a string or a composition of nodes
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The buttons of the dialog
   */
  buttons: PropTypes.node.isRequired,
  /**
   * If `true` the dialog is open, if `false`dialog is close
   */
  open: PropTypes.bool,
  /**
   * The functions that is triggered when the dialog closes.
   */
  onClose: PropTypes.func,
};

export default withStyles(dialogStyles, { name: "CookiesConsentDialog" })(CookiesConsentDialog);
