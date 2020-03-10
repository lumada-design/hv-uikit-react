import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@material-ui/core";
import withStyles from "../styles/withStyles";
import styles from "./styles";

const HvTabs = ({ classes, ...others }) => (
  <Tabs
    classes={{
      root: classes.root,
      flexContainer: classes.flexContainer,
      indicator: classes.indicator,
      scroller: classes.scroller
    }}
    {...others}
    TabIndicatorProps={{ children: <div /> }}
  />
);

HvTabs.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the flex container element.
     */
    flexContainer: PropTypes.string,
    /**
     * Styles applied to the `TabIndicator` component.
     */
    indicator: PropTypes.string,
    /**
     * Styles applied to the `TabIndicator` component.
     */
    scroller: PropTypes.string
  }).isRequired,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: PropTypes.func,
  /**
   * 	The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to `false`.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any
};

HvTabs.defaultProps = {
  children: null,
  onChange: undefined,
  value: undefined
};

export default withStyles(styles, { name: "HvTabs" })(HvTabs);
