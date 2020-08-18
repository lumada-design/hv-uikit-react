import React from "react";
import PropTypes from "prop-types";
import { Tab, ButtonBase, withStyles } from "@material-ui/core";
import styles from "./styles";

const HvTab = props => {
  const { classes, ...others } = props;

  const TabSubstitute = React.forwardRef((subprops, ref) => {
    return (
      <ButtonBase disabled={others.disabled} ref={ref} {...subprops}>
        {subprops.children}
        <div role="presentation" className={classes.tabBorder} />
      </ButtonBase>
    );
  });

  return (
    <>
      <Tab
        classes={{
          root: classes.root,
          selected: classes.selected,
          disabled: classes.disabled
        }}
        disableRipple
        disableTouchRipple
        component={TabSubstitute}
        {...others}
      />
    </>
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
     * Styles applied to the tab bottom border.
     */
    tabBorder: PropTypes.string,
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
