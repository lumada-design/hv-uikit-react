import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  HvDialog,
  HvDialogTitle,
  HvDialogContent,
  HvDialogActions,
} from "@hitachivantara/uikit-react-core";

import { withStyles } from "@material-ui/core";

import styles from "./styles";

/**
 * CookiesConsentDialog description/documentation paragraph
 */
const HvCookiesConsentDialog = (props) => {
  const { className, classes, title, description, buttons, ...others } = props;

  return (
    <HvDialog
      className={clsx(className, classes.root)}
      classes={{ closeButton: classes.closeButton }}
      {...others}
    >
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
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttons: PropTypes.node.isRequired,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    closeButton: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvCookiesConsentDialog" })(HvCookiesConsentDialog);
