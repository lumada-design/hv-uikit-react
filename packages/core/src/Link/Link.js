import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const HvLink = props => {
  const { classes, children, route } = props;

  return (
    <a href={route} className={classes.a}>
      {children}
    </a>
  );
};

HvLink.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    a: PropTypes.string
  }).isRequired,
  /**
   * Children.
   */
  children: PropTypes.node.isRequired,
  /**
   * Path route.
   */
  route: PropTypes.string.isRequired
};

HvLink.defaultProps = {};

export default withStyles(styles, { name: "HvLink" })(HvLink);
