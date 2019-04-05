/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component contained primary.
     */
    containedPrimary: PropTypes.string,
    /**
     * Styles applied to the component outline primary.
     */
    outlinedPrimary: PropTypes.string,
    /**
     * Styles applied to the component text primary.
     */
    textPrimary: PropTypes.string,
    /**
     * Styles applied to the component when disable.
     */
    disabled: PropTypes.string
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
  onClick: PropTypes.instanceOf(Function)
};

HvButton.defaultProps = {
  className: "",
  type: "button",
  colorType: "primary",
  disabled: false,
  onClick: () => {}
};

export default HvButton;
