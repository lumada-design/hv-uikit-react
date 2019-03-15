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
import classNames from "classnames";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";
import MessageContainer from "./MessageContainer/MessageContainer";
import ActionContainer from "./ActionContainer/ActionContainer";

/**
 * Container of banner.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function HvBannerContentWrapper(props) {
  const {
    classes,
    message,
    showIcon,
    customIcon,
    variant,
    actionsOnMessage,
    action,
    onClose,
    ...other
  } = props;
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
        classes={classes}
        className={classNames(classes[variant], classes.baseVariant)}
        message=<MessageContainer
          classes={classes}
          icon={icon}
          actionsOnMessage={actionsOnMessage}
          message={message}
        />
        action=<ActionContainer
          classes={classes}
          onClose={onClose}
          action={action}
        />
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
