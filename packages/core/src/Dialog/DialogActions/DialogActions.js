import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { DialogActions } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const HvDialogActions = (props) => {
  const { classes, className, children, fullscreen = false, ...others } = props;
  return (
    <DialogActions
      classes={{
        root: clsx(classes.root, fullscreen && classes.fullscreen),
        spacing: classes.spacing,
      }}
      className={className}
      {...others}
    >
      {children}
    </DialogActions>
  );
};

HvDialogActions.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the actions).
     */
    root: PropTypes.string,
    /**
     * Style applied to the root of the component if disableSpacing is off.
     */
    spacing: PropTypes.string,
    /**
     * Style applied to the root of the component if fullscreen is on.
     */
    fullscreen: PropTypes.string,
  }).isRequired,
  /**
   * Actions of the Dialog.
   */
  children: PropTypes.node.isRequired,
  /**
   * Whether or not the dialog is in fullscreen mode.
   */
  fullscreen: PropTypes.bool,
};

export default withStyles(styles, { name: "HvDialogActions" })(HvDialogActions);
