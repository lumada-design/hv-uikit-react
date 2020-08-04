import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const MultiButton = ({
  className,
  children,
  classes,
  onChange,
  selection = [],
  vertical = false,
  ...others
}) => {
  const renderChild = (child, idx) => {
    const isSelected = child.props.selected ?? selection.includes(idx);

    return cloneElement(child, {
      key: `btnkey_${idx + 1}`,
      category: "ghost",
      overrideIconColors: false,
      onClick: event => {
        onChange?.(event, idx);
        child.props.onClick?.(event);
      },
      className: clsx(child.props.className, classes.button, {
        [classes.isSelected]: isSelected,
        [classes.isUnselected]: !isSelected
      })
    });
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical
      })}
      {...others}
    >
      {React.Children.map(
        children.type === React.Fragment ? children.props.children : children,
        renderChild
      )}
    </div>
  );
};

MultiButton.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * The MultiButton's buttons.
   */
  children: PropTypes.node,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the MultiButton root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the MultiButton when it's vertical.
     */
    vertical: PropTypes.string,
    /**
     * Styles applied to the button label.
     */
    highlightText: PropTypes.string,
    /**
     * Styles applied to the each button.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the each button's icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the button when it's selected.
     */
    isSelected: PropTypes.string,
    /**
     * Styles applied to the button when it's not selected.
     */
    isUnselected: PropTypes.string
  }).isRequired,
  /**
   * If the MultiButton is to be displayed vertically.
   */
  vertical: PropTypes.bool,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * Array of selection ids to use when controlled
   */
  selection: PropTypes.arrayOf(PropTypes.number)
};

export default withStyles(styles, { name: "HvMultiButton" })(MultiButton);
