import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";
import getMaterialConfiguration from "./materialConfigurarion";
import styles from "./styles";

/**
 * A button refers to a graphical control element that provides the user a way to trigger an event.
 */
const HvButton = (props) => {
  const {
    id,
    classes,
    className,
    children,
    disabled,
    onClick,
    category = "primary",
    startIcon,
    overrideIconColors = true,
    ...others
  } = props;

  const buttonConfiguration = getMaterialConfiguration(classes, category);
  const onClickHandler = (event) => {
    if (!disabled) onClick?.(event);
  };

  return (
    <Button
      className={clsx(className, {
        [classes.rootIcon]: category === "icon",
        [classes[`${category}SVG`]]: overrideIconColors,
      })}
      id={id}
      classes={buttonConfiguration.classes}
      variant={buttonConfiguration.variant}
      color={buttonConfiguration.color}
      disabled={disabled}
      disableRipple
      onClick={onClickHandler}
      startIcon={startIcon}
      {...others}
    >
      {children}
    </Button>
  );
};

HvButton.propTypes = {
  /**
   * Category of button to use
   */
  category: PropTypes.oneOf([
    "ghost",
    "ghostSecondary",
    "icon",
    "primary",
    "secondary",
    "semantic",
  ]),
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the ghost button.
     */
    ghost: PropTypes.string,
    /**
     * Styles applied to the ghost button when it is disabled.
     */
    ghostDisabled: PropTypes.string,
    /**
     * Styles applied to the secondary ghost button.
     */
    ghostSecondary: PropTypes.string,
    /**
     * Styles applied to the secondary ghost button when it is disabled.
     */
    ghostSecondaryDisabled: PropTypes.string,
    /**
     * Styles applied to the primary button.
     */
    primary: PropTypes.string,
    /**
     * Styles applied to the primary button when it is disabled.
     */
    primaryDisabled: PropTypes.string,
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root when category is icon.
     */
    rootIcon: PropTypes.string,
    /**
     * Styles applied to the secondary button.
     */
    secondary: PropTypes.string,
    /**
     * Styles applied to the secondary button when it is disabled.
     */
    secondaryDisabled: PropTypes.string,
    /**
     * Styles applied to the semantic button.
     */
    semantic: PropTypes.string,
    /**
     * Styles applied to the semantic button when it is disabled.
     */
    semanticDisabled: PropTypes.string,
    /**
     * Styles applied to the inspireRed primary button.
     */
    startIcon: PropTypes.string,
  }),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The function executed when the button is pressed.
   * @param event React.MouseEvent<HTMLButtonElement>
   */
  onClick: PropTypes.func,
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * Defines the default colors of the button are forced into the icon.
   */
  overrideIconColors: PropTypes.bool,
};

export default withStyles(styles, { name: "HvButton" })(HvButton);
