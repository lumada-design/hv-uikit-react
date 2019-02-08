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
import Typography from "@material-ui/core/Typography";
import VariantIcons from "./VariantIcons";

/**
 * Mapper for status/icons.
 *
 * @param severity
 * @returns {*}
 */
const severityIcon = severity => {
  let icon;
  switch (severity.toLowerCase()) {
    case "error":
      icon = VariantIcons.error;
      break;
    case "warning":
      icon = VariantIcons.warning;
      break;
    case "info":
      icon = VariantIcons.info;
      break;
    // case "negligible":
    //   icon = negligible;
    //   break;
    default:
      icon = VariantIcons.success;
      break;
  }

  return icon;
};

/**
 * Mapper for status/variant status
 *
 * @param severity
 * @returns {string}
 */
const mapSeverityToVariant = severity => {
  let variant;
  switch (severity.toLowerCase()) {
    case "catastrophic":
    case "error":
      variant = "error";
      break;
    case "critical":
    case "warning":
      variant = "warning";
      break;
    case "marginal":
    case "info":
      variant = "info";
      break;
    default:
      variant = "default";
  }
  return variant;
};

function HvSnackbarContentWrapper(props) {
  const {
    classes,
    message,
    showIcon,
    customIcon,
    variant,
    action,
    ...other
  } = props;
  let icon;
  let actionContainer;

  if (action !== null)
    actionContainer = React.cloneElement(action, { className: classes.action });

  if (customIcon !== null) {
    icon = React.cloneElement(customIcon, { className: classes.iconVariant });
  } else if (showIcon) {
    icon = React.cloneElement(severityIcon(mapSeverityToVariant(variant)), {
      className: classes.iconVariant
    });
  }

  return (
    <SnackbarContent
      classes={{ root: classes.root, message: classes.message }}
      className={classes[variant]}
      message={
        <div id="client-snackbar" className={classes.messageSpan}>
          {icon}
          <Typography
            className={classNames(
              classes.messageText,
              {
                [classes.messageWithoutIcon]: !showIcon && customIcon === null
              },
              { [classes.messageWithoutAction]: action === null }
            )}
          >
            {message}
          </Typography>
          {actionContainer}
        </div>
      }
      {...other}
    />
  );
}

HvSnackbarContentWrapper.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
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
   * Action to display.
   */
  action: PropTypes.node
};

HvSnackbarContentWrapper.defaultProps = {
  message: "",
  showIcon: false,
  customIcon: null,
  action: null
};

export default HvSnackbarContentWrapper;
