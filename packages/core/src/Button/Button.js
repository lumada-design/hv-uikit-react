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
import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";
import getMaterialConfiguration from "./materialConfigurarion";
import styles from "./styles";

/**
 * Hitachi Vantara Design System compliant Button allows 4 categories
 * md expects a path to the md file relative to the location of doc/.storybook/layout-addon/Layout/Accessibility
 * @md
 * ../../../../../core/src/Button/ButtonAccessibility.md
 * @mde
 * @a
 *  -1.1.1 Non-text Content:
 *  -1.3.1 Info and Relationships:
 *  -1.3.1 Sensory Characteristics:
 *    - In case of button without(Ex: just an icon) text an alternative description must be provided for instance:
 *      - aria-labelledby or aria-label.
 *      - aria-describedby that points to the id of an element containing the description.
 *   -2.1.1 Keyboard:
 *    - Make all functionality available from a keyboard.
 *      - Following button activation, focus is set depending on the type of action the button performs. For example:
 *        - If the button onClick opens a dialog, the focus moves inside the dialog.
 *        - If the button onClick closes a dialog, focus typically returns to the button that opened the dialog unless
 *          the function performed in the dialog context logically leads to a different element.
 *          For example, activating a cancel button in a dialog returns focus to the button that opened the dialog.
 *          However, if the dialog were confirming the action of deleting the page from which it was opened,
 *          the focus would logically move to a new context.
 *        - If the button onClick does not dismiss the current context,
 *          then focus typically remains on the button after activation, e.g., an Apply or Recalculate button.
 *        - If the button action indicates a context change, such as move to next step in a wizard or add another
 *          search criteria, then it is often appropriate to move focus to the starting point for that action.
 *        - If the button is activated with a shortcut key, the focus usually remains in the context from which the shortcut key was activated.
 *          For example, if Alt + U were assigned to an "Up" button that moves the currently focused item in a list one position higher in the list,
 *          pressing Alt + U when the focus is in the list would not move the focus from the list.
 *  -2.1.2 No Keyboard Trap:
 *    - If keyboard focus can be moved to a button using a keyboard interface,
 *      then focus can be moved away from the button using only a keyboard interface.
 *  -2.4.3 Focus Order
 *    - If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation,
 *      focusable buttons receive focus in an order that preserves meaning and operability.
 *  -2.5.3 Label in Name:
 *     -For buttons with labels that include text or images of text, the name contains the text that is presented visually.
 *        - When using aria-labelledby, aria-label or aria-describedby these values must contain the text that is visible.
 * @ea
 */
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
      {...other}
    >
      {startIcon && <div className={classes.startIcon}>{startIcon}</div>}
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
  startIcon: null
};

export default withStyles(styles, { name: "HvButton" })(HvButton);
