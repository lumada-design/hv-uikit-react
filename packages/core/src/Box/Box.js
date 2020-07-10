import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Box component is wrapper component for styling.
 */
const HvBox = props => {
  const { className, classes, children, ...others } = props;

  return (
    <Box className={clsx(className, classes.root)} {...others}>
      {children}
    </Box>
  );
};

HvBox.propTypes = {
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
    root: PropTypes.string
  }).isRequired,
  /**
   * The content of the component.
   */
  children: PropTypes.node
};

export default withStyles(styles, { name: "HvBox" })(HvBox);
