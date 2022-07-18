import React from "react";
import PropTypes from "prop-types";
import { DialogContent } from "@mui/material";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import HvTypography from "../../Typography";
import styles from "./styles";

const HvDialogContent = ({ classes, className, children, indentContent = false }) => {
  return (
    <HvTypography
      component={DialogContent}
      className={clsx(className, classes.root, { [classes.textContent]: indentContent })}
    >
      {children}
    </HvTypography>
  );
};

HvDialogContent.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the content).
     */
    root: PropTypes.string,
    /**
     * Style applied when the content is a string.
     */
    textContent: PropTypes.string,
  }).isRequired,
  /**
   * Content should be indented in relationship to the Dialog title.
   */
  indentContent: PropTypes.bool,
  /**
   * Content to be rendered.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvDialogContent" })(HvDialogContent);
