import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const Actions = ({ classes, className, children, ...others }) => {
  return (
    <div className={clsx(className, classes.root)} {...others}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Node to be rendered
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvUserPreferencesActions" })(Actions);
