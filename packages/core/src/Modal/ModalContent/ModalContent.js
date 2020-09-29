import React from "react";
import PropTypes from "prop-types";
import { DialogContent, withStyles } from "@material-ui/core";
import clsx from "clsx";
import HvTypography from "../../Typography";
import styles from "./styles";

const ModalContent = ({ classes, className, children, indentContent = false }) => {
  return (
    <DialogContent className={clsx(className, classes.root)}>
      <div className={clsx({ [classes.textContent]: indentContent })}>
        <HvTypography>{children}</HvTypography>
      </div>
    </DialogContent>
  );
};

ModalContent.propTypes = {
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
   * Content should be indented in relationship to the Modal title.
   */
  indentContent: PropTypes.bool,
  /**
   * Content to be rendered.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvModalContent" })(ModalContent);
