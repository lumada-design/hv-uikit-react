import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * A panel is a container used in a variety of patterns (e.g. dropdown, filter group, details section).
 * It can be horizontal or vertical and its size is defined by its content and how it relates to surrounding patterns.
 * Regardless of its content, a panel look and feel should be consistent.
 */
const HvPanel = (props) => {
  const { id, className, classes, children, ...others } = props;

  return (
    <Box id={id} className={clsx(className, classes.root)} {...others}>
      {children}
    </Box>
  );
};

HvPanel.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The content of the panel.
   */
  children: PropTypes.node,
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
};

export default withStyles(styles, { name: "HvPanel" })(HvPanel);
