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
  classes,
  message,
  showIcon,
  customIcon,
  variant,
  actionsOnMessage,
  action,
  onClose,
  ...other
}) {
  let icon = null;

  // inject the correct classes to the icon
  if (customIcon) {
    icon = React.cloneElement(customIcon, { className: classes.iconVariant });
  } else if (showIcon) {
    icon = React.cloneElement(severityIcon(mapSeverityToVariant(variant)), {
      className: classes.iconVariant
    });
  }

  return (
    <div className={classes.outContainer}>
      <SnackbarContent
        classes={{
          root: classes.root,
          message: classes.message,
          action: classes.action
        }}
        className={classNames(classes[variant], classes.baseVariant)}
        message=<MessageContainer
          icon={icon}
          actionsOnMessage={actionsOnMessage}
          message={message}
        />
        action=<ActionContainer onClose={onClose} action={action} />
        {...other}
      />
    </div>
  );
}

HvBannerContentWrapper.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * The message to display.
   */
  message: PropTypes.node,
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
   * Actions to display on message.
   */
  actionsOnMessage: PropTypes.node,
  /**
   * Actions to display.
   */
  action: PropTypes.node
};

HvBannerContentWrapper.defaultProps = {
  classes: "",
  message: "",
  showIcon: false,
  customIcon: null,
  actionsOnMessage: undefined,
  action: undefined
};

export default HvBannerContentWrapper;
