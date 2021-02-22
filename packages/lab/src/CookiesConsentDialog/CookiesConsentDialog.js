import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { HvDialog, HvDialogTitle, HvDialogContent, HvDialogActions } from "@hv/uikit-react-core";

import styles from "./styles";

/**
 * CookiesConsentDialog description/documentation paragraph
 */
const HvCookiesConsentDialog = (props) => {
  const { className, classes, title, description, buttons, ...others } = props;

  return (
    <HvDialog className={clsx(className, classes.root)} {...others}>
      <HvDialogTitle>{title}</HvDialogTitle>
      <HvDialogContent>{description}</HvDialogContent>
      <HvDialogActions>{buttons}</HvDialogActions>
    </HvDialog>
  );
};

HvCookiesConsentDialog.propTypes = {
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
  }).isRequired,
  /**
   * The title of the dialog
   */
  title: PropTypes.string.isRequired,
  /**
   * The content of the dialog, can be a string or a composition of nodes
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The buttons of the dialog
   */
  buttons: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvCookiesConsentDialog" })(HvCookiesConsentDialog);
