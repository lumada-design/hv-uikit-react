/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import buttonTypes from "./buttonTypes";
import materialButtonConfiguration from "./materialButtonConfiguration";

/**
 * Receives a type of HvButton and generates an appropiate material ui configuration.
 *
 * @param {*} type - The button type configuration that will be generated.
 * @returns {Object} - An Object with the color and variant values required by the material ui button.
 */
const generateButtonConfiguration = type => {
  switch (type) {
    default:
    case buttonTypes.primary:
      return {
        color: materialButtonConfiguration.color.primary,
        variant: materialButtonConfiguration.variant.contained
      };
    case buttonTypes.secondary:
      return {
        color: materialButtonConfiguration.color.primary,
        variant: materialButtonConfiguration.variant.outlined
      };
    case buttonTypes.link:
      return {
        color: materialButtonConfiguration.color.primary,
        variant: materialButtonConfiguration.variant.text
      };
  }
};

const HvButton = props => {
  const {
    classes,
    className,
    children,
    disabled,
    onClick,
    type,
    colorType,
    ...other
  } = props;
  const buttonConfiguration = generateButtonConfiguration(colorType);

  return (
    <Button
      className={className}
      classes={classes}
      variant={buttonConfiguration.variant}
      color={buttonConfiguration.color}
      disabled={disabled}
      disableRipple
      onClick={onClick}
      type={type}
      {...other}
    >
      {children}
    </Button>
  );
};

HvButton.propTypes = {
  /**
   * Type of button to use.
   *  - Accepted values:
   *    --"submit",
   *    --"reset",
   *    --"button"
   */
  type: PropTypes.oneOf(["submit", "reset", "button"]),
  /**
   * Type of color of HvButton to use.
   *  - Accepted values:
   *    --"primary",
   *    --"secondary",
   *    --"link"
   *  - note: the buttonType object should be used to set this value.
   */
  colorType: PropTypes.oneOf(["primary", "secondary", "link"]),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The content inside the button.
   */
  children: PropTypes.string.isRequired,
  /**
   * If set to `true` the button is disabled and the onClick function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the button is pressed.
   */
  onClick: PropTypes.instanceOf(Function)
};

HvButton.defaultProps = {
  className: "",
  type: "button",
  colorType: buttonTypes.Primary,
  disabled: false,
  onClick: () => {}
};

export default HvButton;
