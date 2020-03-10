import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import getMaterialConfiguration from "./materialConfigurarion";
import withStyles from "../styles/withStyles";
import styles from "./styles";

const HvButton = props => {
  const {
    classes,
    className,
    id,
    children,
    disabled,
    onClick,
    category,
    startIcon,
    ...other
  } = props;

  const buttonConfiguration = getMaterialConfiguration(classes, category);
  const onClickHandler = event => {
    if (!disabled) onClick(event);
  };

  return (
    <Button
      className={clsx(className, {
        [classes.rootIcon]: category === "icon"
      })}
      id={id}
      classes={buttonConfiguration.classes}
      variant={buttonConfiguration.variant}
      color={buttonConfiguration.color}
      disabled={disabled}
      disableRipple
      onClick={onClickHandler}
      startIcon={startIcon}
      {...other}
    >
      {children}
    </Button>
  );
};

HvButton.propTypes = {
  /**
   * Category of button to use.
   */
  category: PropTypes.oneOf([
    "primary",
    "secondary",
    "ghost",
    "ghostSecondary",
    "semantic",
    "icon"
  ]),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root when category is icon.
     */
    rootIcon: PropTypes.string,
    /**
     * Styles applied to the primary button.
     */
    primary: PropTypes.string,
    /**
     * Styles applied to the primary button when it is disabled.
     */
    primaryDisabled: PropTypes.string,
    /**
     * Styles applied to the secondary button.
     */
    secondary: PropTypes.string,
    /**
     * Styles applied to the secondary button when it is disabled.
     */
    secondaryDisabled: PropTypes.string,
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
     * Styles applied to the semantic button.
     */
    semantic: PropTypes.string,
    /**
     * Styles applied to the semantic button when it is disabled.
     */
    semanticDisabled: PropTypes.string,
    /**
     * Styles applied to the icon on the left.
     */
    startIcon: PropTypes.string
  }).isRequired,
  /**
   * The content inside the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * If `true` the button is disabled and the onClick function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the button is pressed.
   */
  onClick: PropTypes.instanceOf(Function),
  /**
   * The icon to be rendered before the children.
   */
  startIcon: PropTypes.node
};

HvButton.defaultProps = {
  className: "",
  id: undefined,
  category: "primary",
  disabled: false,
  onClick: () => {},
  startIcon: undefined
};

export default withStyles(styles, { name: "HvButton" })(HvButton);
