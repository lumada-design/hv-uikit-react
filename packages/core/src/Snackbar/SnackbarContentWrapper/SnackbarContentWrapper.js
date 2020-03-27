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
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import TextTruncate from "./MultiLineEllipsis";
import variantIcon from "./VariantIcons";
import Actions from "../../Actions";

import styles from "./styles";

const HvSnackbarContentWrapper = ({
  id,
  classes,
  label,
  showIcon,
  customIcon,
  variant,
  action,
  actionCallback,
  ...other
}) => {
  const icon = customIcon || (showIcon && variantIcon(variant));
  const innerAction = React.isValidElement(action) ? action : [action];

  return (
    <SnackbarContent
      id={id}
      classes={{ root: classes.root, message: classes.message }}
      className={classes[variant]}
      message={
        <div
          {...(id && { id: `${id}-message` })}
          className={classes.messageSpan}
        >
          {icon && <div className={classes.iconVariant}>{icon}</div>}
          <TextTruncate
            {...(id && { id: `${id}-message-text` })}
            containerClassName={classes.messageText}
            line={3}
            text={label}
            textElement="div"
          />
          {action && (
            <div {...(id && { id: `${id}-action` })} className={classes.action}>
              <Actions
                category="semantic"
                actions={innerAction}
                actionsCallback={actionCallback}
              />
            </div>
          )}
        </div>
      }
      {...other}
    />
  );
};

HvSnackbarContentWrapper.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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
  action: oneOfType([
    PropTypes.node,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.func,
      disabled: PropTypes.bool
    })
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback: PropTypes.func
};

HvSnackbarContentWrapper.defaultProps = {
  id: undefined,
  label: "",
  showIcon: false,
  customIcon: null,
  action: null,
  actionCallback: () => {}
};

export default withStyles(styles, { name: "HvSnackbarContentWrapper" })(
  HvSnackbarContentWrapper
);
