import React from "react";
import PropTypes from "prop-types";
import { DialogContent, withStyles } from "@material-ui/core";
import clsx from "clsx";
import HvTypography from "../../Typography";
import styles from "./styles";

/**
 * Message container. The passed children is render in this container, creating
 * a typography node if the children is of the string type.
 *
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
const ModalContent = ({ classes, className = "", children }) => {
  const isString = typeof children === "string";

  return (
    <DialogContent
      className={clsx(className, classes.root, {
        [classes.textContent]: isString
      })}
    >
      {!isString && children}
      {isString && <HvTypography variant="normalText">{children}</HvTypography>}
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
    textContent: PropTypes.string
  }).isRequired,
  /**
   * Content to be render.
   */
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { name: "HvModalContent" })(ModalContent);
