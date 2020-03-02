import React from "react";
import PropTypes from "prop-types";
import { Tab, withStyles } from "@material-ui/core";
import styles from "./styles";

const HvTab = ({ classes, ...others }) => (
  <Tab
    classes={{
      root: classes.root,
      selected: classes.selected,
      disabled: classes.disabled
    }}
    disableRipple
    disableTouchRipple
    {...others}
  />
);

HvTab.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label container element if `label` is provided.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the root element if `selected={true}` (controlled by the Tabs component).
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the root element if `disabled={true}` (controlled by the Tabs component).
     */
    disabled: PropTypes.string
  }).isRequired,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The icon element.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node
};

HvTab.defaultProps = {
  disabled: false,
  icon: null,
  label: null
};

export default withStyles(styles, { name: "HvTab" })(HvTab);
