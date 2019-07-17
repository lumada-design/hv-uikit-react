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
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import materialConfigurationFactory from "./materialConfigurarionFactory";

const HvButton = props => {
  const {
    classes,
    className,
    id,
    children,
    disabled,
    onClick,
    type,
    colorType,
    category,
    variant,
    ...other
  } = props;

  const buttonConfiguration = materialConfigurationFactory(
    classes,
    category,
    variant,
    colorType
  );
  const onClickHandler = event => {
    if (!disabled) onClick(event);
  };

  return (
    <Button
      className={className}
      id={id}
      classes={buttonConfiguration.classes}
      variant={buttonConfiguration.variant}
      color={buttonConfiguration.color}
      disabled={disabled}
      disableRipple
      onClick={onClickHandler}
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
   * @deprecated
   */
  type: deprecatedPropType(
    PropTypes.oneOf(["submit", "reset", "button"]),
    "This will be deprecated in material 4"
  ),
  /**
   * Type of color of HvButton to use.
   *  - Accepted values:
   *    --"primary",
   *    --"secondary",
   *    --"link"
   *  - note: the buttonType object should be used to set this value.
   * @deprecated
   */
  colorType: deprecatedPropType(
    PropTypes.oneOf(["primary", "secondary", "link"]),
    "Instead use the category property"
  ),
  /**
   * Category of button to use.
   *  - Accepted values:
   *    --"primary",
   *    --"secondary",
   *    --"ghost"
   *    --"ghostSecondary"
   *  - note: the buttonType object should be used to set this value.
   */
  category: PropTypes.oneOf([
    "primary",
    "secondary",
    "ghost",
    "ghostSecondary"
  ]),
  /**
   * The variant of button to use.
   *  - Accepted values:
   *    -- "primary"
   *    -- "inspireRed"
   */
  variant: PropTypes.oneOf(["primary", "inspireRed"]),
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
     * Styles applied to the primary primary button.
     */
    primary: PropTypes.string,
    /**
     * Styles applied to the primary primary button when it is disabled.
     */
    primaryDisabled: PropTypes.string,
    /**
     * Styles applied to the primary secondary button.
     */
    secondary: PropTypes.string,
    /**
     * Styles applied to the primary secondary button when it is disabled.
     */
    secondaryDisabled: PropTypes.string,
    /**
     * Styles applied to the primary ghost button.
     */
    ghost: PropTypes.string,
    /**
     * Styles applied to the primary ghost button when it is disabled.
     */
    ghostDisabled: PropTypes.string,
    /**
     * Styles applied to the primary secondary ghost  button.
     */
    ghostSecondary: PropTypes.string,
    /**
     * Styles applied to the primary secondary ghost button when it is disabled.
     */
    ghostSecondaryDisabled: PropTypes.string,
    /**
     * Styles applied to the inspireRed primary button.
     */
    inspireRedPrimary: PropTypes.string,
    /**
     * Styles applied to the inspireRed primary button when it is disabled.
     */
    inspireRedPrimaryDisabled: PropTypes.string,
    /**
     * Styles applied to the inspireRed secondary button.
     */
    inspireRedSecondary: PropTypes.string,
    /**
     * Styles applied to the inspireRed secondary button when it is disabled.
     */
    inspireRedSecondaryDisabled: PropTypes.string,
    /**
     * Styles applied to the inspireRed ghost button.
     */
    inspireRedGhost: PropTypes.string,
    /**
     * Styles applied to the inspireRed ghost button when it is disabled.
     */
    inspireRedGhostDisabled: PropTypes.string,
    /**
     * Styles applied to the inspireRed secondary ghost  button.
     */
    inspireRedGhostSecondary: PropTypes.string,
    /**
     * Styles applied to the inspireRed secondary ghost button when it is disabled.
     */
    inspireRedGhostSecondaryDisabled: PropTypes.string
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
  id: undefined,
  type: "button",
  colorType: undefined,
  category: "primary",
  variant: "primary",
  disabled: false,
  onClick: () => {}
};

export default HvButton;
