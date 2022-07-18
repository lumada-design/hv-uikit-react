import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * A Tab is a graphical control element that allows multiple documents or panels to be contained within a single window.
 * Tabs can be used as a navigational widget for switching between sets of documents.
 */
const HvTabs = (props) => {
  const { classes, ...others } = props;

  return (
    <Tabs
      classes={{
        root: classes.root,
        flexContainer: classes.flexContainer,
        indicator: classes.indicator,
        scroller: classes.scroller,
      }}
      TabIndicatorProps={{ children: <div /> }}
      {...others}
    />
  );
};

HvTabs.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    scroller: PropTypes.string,
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
  value: PropTypes.any,
};

export default withStyles(styles, { name: "HvTabs" })(HvTabs);
