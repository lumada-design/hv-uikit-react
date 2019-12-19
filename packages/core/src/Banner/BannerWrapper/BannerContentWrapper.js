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
import PropTypes, { oneOfType } from "prop-types";
import classNames from "classnames";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";
import MessageContainer from "./MessageContainer";
import ActionContainer from "./ActionContainer";

/**
 * Container of banner.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function HvBannerContentWrapper({
  id,
  classes,
  showIcon,
  customIcon,
  variant,
  onClose,
  actions,
  actionsCallback,
  actionsPosition,
  theme,
  content,
  ...other
}) {
  const icon =
    customIcon ||
    (showIcon && severityIcon(mapSeverityToVariant(variant), theme));

  let effectiveActionsPosition = actionsPosition;
  if (actionsPosition === "auto") {
    // default to inline
    // this might try to be more inteligent in the future,
    // taking into account the content lenght, available space,
    // number of actions, etc..
    effectiveActionsPosition = "inline";
  }

  return (
    <div className={classes.outContainer}>
      <SnackbarContent
        id={id}
        classes={{
          root: classes.root,
          message: classes.message,
          action: classes.action
        }}
        className={classNames(classes[variant], classes.baseVariant)}
        message={
          <MessageContainer
            id={id}
            icon={icon}
            {...(effectiveActionsPosition === "inline" && {
              actionsOnMessage: actions,
              actionsOnMessageCallback: actionsCallback
            })}
            message={content}
          />
        }
        action={
          <ActionContainer
            id={id}
            onClose={onClose}
            {...(effectiveActionsPosition === "bottom-right" && {
              action: actions,
              actionCallback: actionsCallback
            })}
          />
        }
        {...other}
      />
    </div>
  );
}

HvBannerContentWrapper.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * The message to display.
   */
  content: PropTypes.node,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"])
    .isRequired,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * onClose function.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Actions to display on the right side.
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The position property of the header.
   */
  actionsPosition: PropTypes.PropTypes.oneOf([
    "auto",
    "inline",
    "bottom-right"
  ]),
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

HvBannerContentWrapper.defaultProps = {
  id: null,
  classes: "",
  content: "",
  showIcon: false,
  customIcon: null,
  actions: null,
  actionsCallback: () => {},
  actionsPosition: "auto",
  theme: undefined
};

export default HvBannerContentWrapper;
