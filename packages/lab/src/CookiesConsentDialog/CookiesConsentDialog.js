import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { HvDialog, HvDialogTitle, HvDialogContent, HvDialogActions } from "@hv/uikit-react-core";

import styles from "./styles";

const CookiesConsentDialog = (props) => {
  const { className, classes, title, description, buttons, open, onClose, ...others } = props;

  return (
    <HvDialog
      className={clsx(className, classes.root)}
      classes={{ closeButton: classes.closeButton }}
      open={open}
      onClose={onClose}
      {...others}
    >
      <HvDialogTitle>{title}</HvDialogTitle>
      <HvDialogContent>{description}</HvDialogContent>
      <HvDialogActions>{buttons}</HvDialogActions>
    </HvDialog>
  );
};

CookiesConsentDialog.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the dialog's close button.
     */
    closeButton: PropTypes.string,
  }).isRequired,
  /**
   * The title of the dialog
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The content of the dialog
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

export default withStyles(styles, { name: "CookiesConsentDialog" })(CookiesConsentDialog);
