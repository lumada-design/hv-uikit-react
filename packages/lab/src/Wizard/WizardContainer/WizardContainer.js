import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { HvDialog } from "@hitachivantara/uikit-react-core";
import HvWizardCleanContainer from "../WizardCleanContainer";

import styles from "./styles";

const HvWizardContainer = ({ classes, className, children, handleClose, open, ...others }) => {
  const { fullscreen } = others;
  const Container = fullscreen ? HvWizardCleanContainer : HvDialog;

  return (
    <Container
      classes={{ closeButton: classes.closeButton, paper: classes.paper }} // overrides css
      className={className}
      open={open}
      onClose={handleClose}
      {...others}
    >
      {React.Children.map(children, (child) => React.cloneElement(child, { fullscreen }))}
    </Container>
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
