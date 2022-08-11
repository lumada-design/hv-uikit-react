import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvDialog } from "@hitachivantara/uikit-react-core";

import styles from "./styles";

const HvWizardContainer = ({ classes, className, children, handleClose, open, ...others }) => {
  return (
    <HvDialog
      classes={{ closeButton: classes.closeButton, paper: classes.paper }} // overrides css
      className={clsx(className, classes.root)}
      open={open}
      onClose={handleClose}
      {...others}
    >
      {children}
    </HvDialog>
  );
};

HvWizardContainer.propTypes = {
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
     * Style applied to the component (root).
     */
    paper: PropTypes.string,
    /**
     * Style applied to the close button.
     */
    closeButton: PropTypes.string,
  }).isRequired,
  /**
   * Components of the Wizard.
   */
  children: PropTypes.node.isRequired,
  /**
   * Current state of the Wizard.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   */
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { name: "HvWizardContainer" })(HvWizardContainer);
