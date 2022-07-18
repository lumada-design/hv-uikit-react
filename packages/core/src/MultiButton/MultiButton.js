import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * Multi-buttons are grouped sets of buttons displayed horizontal or vertically in the same container.
 */
const HvMultiButton = (props) => {
  const {
    className,
    children,
    classes,
    disabled = false,
    vertical = false,
    category = "ghost",
    ...others
  } = props;

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical,
      })}
      {...others}
    >
      {React.Children.map(children, (child) => {
        const childIsSelected = !!child.props.selected;

        return cloneElement(child, {
          category,
          disabled: disabled || child.props.disabled,
          className: clsx(child.props.className, classes.button, {
            [classes.selected]: childIsSelected,
          }),
          "aria-pressed": childIsSelected,
        });
      })}
    </div>
  );
};

HvMultiButton.propTypes = {
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
     * Styles applied to the each button.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the button when it's selected.
     */
    selected: PropTypes.string,
  }).isRequired,
  /**
   * If all the buttons are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If the MultiButton is to be displayed vertically.
   */
  vertical: PropTypes.bool,
  /**
   * Category of button to use
   */
  category: PropTypes.oneOf(["ghost", "icon", "primary", "secondary", "semantic"]),
};

export default withStyles(styles, { name: "HvMultiButton" })(HvMultiButton);
