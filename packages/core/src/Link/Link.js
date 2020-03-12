import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const HvLink = props => {
  const { classes, children, route, Component, onClick, data, tabIndex, ...other } = props;

  return onClick ? (
    <Component
      role="button"
      className={classes.a}
      onClick={event => onClick(event, data)}
      tabIndex={tabIndex}
      {...other}
    >
      {children}
    </Component>
  ) : (
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
  route: PropTypes.string.isRequired,
  /**
   * OnClick function.
   */
  onClick: PropTypes.func,
  /**
   * TabIndex.
   */
  tabIndex: PropTypes.number,
  /**
   * Data to be returned in the onClick function.
   */
  data: PropTypes.instanceOf(Object),
  /**
   * The component used for the link node.
   * Either a string to use a DOM element or a component.
   */
  Component: PropTypes.elementType
};

HvLink.defaultProps = {
  tabIndex: 0,
  onClick: undefined,
  data: undefined,
  Component: "div"
};

export default withStyles(styles, { name: "HvLink" })(HvLink);
