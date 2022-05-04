import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const Actions = (props) => {
  const { classes, className, children, ...others } = props;
  return (
    <div className={clsx(className, classes.root)} {...others}>
      {children}
    </div>
  );
};

Actions.propTypes = {
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
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Node to be rendered.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvHeaderActions" })(Actions);
