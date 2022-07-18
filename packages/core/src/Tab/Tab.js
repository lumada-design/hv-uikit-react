import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Tab } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const HvTab = (props) => {
  const { classes, ...others } = props;

  return (
    <Tab
      classes={{
        root: classes.root,
        selected: classes.selected,
        disabled: classes.disabled,
      }}
      disableRipple
      disableTouchRipple
      // expose the global class HvIsFocusVisible as a marker
      // not to be styled directly, only as helper in specific css queries
      focusVisibleClassName={clsx("HvIsFocusVisible", classes.focusVisible)}
      {...others}
    />
  );
};

HvTab.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    disabled: PropTypes.string,
    /**
     * Styles applied to the root element if keyboard focused.
     */
    focusVisible: PropTypes.string,
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
  label: PropTypes.node,
};

HvTab.defaultProps = {
  disabled: false,
  icon: null,
  label: null,
};

export default withStyles(styles, { name: "HvTab" })(HvTab);
