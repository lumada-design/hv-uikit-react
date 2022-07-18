import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import styles from "./styles";

const Actions = ({ className, classes, id, children, ...others }) => {
  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
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
   * Id to be applied to the actions container.
   */
  id: PropTypes.string,
  /**
   * Node to be rendered
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvVerticalNavigationActions" })(Actions);
