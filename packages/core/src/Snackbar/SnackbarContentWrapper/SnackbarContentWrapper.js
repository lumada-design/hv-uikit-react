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
import TextTruncate from "./MultiLineEllipsis";
import variantIcon from "./VariantIcons";

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

  if (customIcon !== null) {
    icon = React.cloneElement(customIcon, { className: classes.iconVariant });
  } else if (showIcon) {
    icon = variantIcon(variant)
      ? React.cloneElement(variantIcon(variant), {
          className: classes.iconVariant
        })
      : null;
  }

  return (
    <SnackbarContent
      classes={{ root: classes.root, message: classes.message }}
      className={classes[variant]}
      message={
        <div id="client-snackbar" className={classes.messageSpan}>
          {icon}
          <TextTruncate
            containerClassName={classNames(classes.messageText, {
              [classes.messageWithoutIcon]: !icon,
              [classes.messageWithoutAction]: action === null
            })}
            line={3}
            text={label}
            textElement="div"
          />
          {action && <div className={classes.action}>{action}</div>}
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
  variant: PropTypes.oneOf(["default", "success", "error"]).isRequired,
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
