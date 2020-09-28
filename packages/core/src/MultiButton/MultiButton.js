import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const HvMultiButton = (props) => {
  const { className, children, classes, category = "ghost", vertical = false, ...others } = props;

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical,
      })}
      {...others}
    >
      {React.Children.map(children, (child) =>
        cloneElement(child, {
          category,
          overrideIconColors: false,
          className: clsx(child.props.className, classes.button, {
            [classes.selected]: child.props.selected,
          }),
        })
      )}
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
   * If the MultiButton is to be displayed vertically.
   */
  vertical: PropTypes.bool,
  /**
   * Category of button to use
   */
  category: PropTypes.oneOf(["ghost", "icon", "primary", "secondary", "semantic"]),
};

export default withStyles(styles, { name: "HvMultiButton" })(HvMultiButton);
