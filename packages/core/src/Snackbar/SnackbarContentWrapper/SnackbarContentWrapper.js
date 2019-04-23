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
import LinesEllipsis from "react-lines-ellipsis";
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
    label,
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
          <div className={classes.containerAlign}>
            <LinesEllipsis
              className={classNames(
                classes.messageText,
                {
                  [classes.messageWithoutIcon]: !showIcon && customIcon === null
                },
                { [classes.messageWithoutAction]: action === null }
              )}
              text={label}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
          <div className={classes.containerAlign}>{actionContainer}</div>
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
  label: PropTypes.string,
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
  label: "",
  showIcon: false,
  customIcon: null,
  action: null
};

export default HvSnackbarContentWrapper;
