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
import Snackbar from "@material-ui/core/Snackbar";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import Slide from "@material-ui/core/Slide";
import HvSnackBarContentWrapper from "./SnackbarContentWrapper";

const transLeft = props => <Slide {...props} direction="left" />;
const transRight = props => <Slide {...props} direction="right" />;
const transUp = props => <Slide {...props} direction="up" />;
const transDown = props => <Slide {...props} direction="down" />;

const snackBarDirComponent = direction => {
  let trans;
  switch (direction) {
    case "left":
      trans = transLeft;
      break;
    case "right":
      trans = transRight;
      break;
    case "up":
      trans = transUp;
      break;
    case "down":
      trans = transDown;
      break;
    default:
      trans = transLeft;
  }
  return trans;
};

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

// TODO: review to use makeStyles during the Material 4 upgrade as a731f9f90e482fcb5a5f630d6015ed2433831011
const HvSnackbar = props => {
  const {
    classes,
    className,
    id,
    open,
    onClose,
    label,
    message,
    anchorOrigin,
    autoHideDuration,
    variant,
    showIcon,
    customIcon,
    action,
    transitionDuration,
    transitionDirection,
    offset
  } = props;

  const anchorOriginOffset = offset && {
    anchorOriginTop: {
      top: `${offset}px`
    },
    anchorOriginBottom: {
      bottom: `${offset}px`
    }
  };

  return (
    <Snackbar
      {...offset && {
        style:
          anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin.vertical)}`]
      }}
      classes={classes}
      className={className}
      id={id}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={transitionDuration}
      TransitionComponent={snackBarDirComponent(transitionDirection)}
    >
      <HvSnackBarContentWrapper
        label={label || message}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
      />
    </Snackbar>
  );
};

HvSnackbar.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component when define as top right.
     */
    anchorOriginTopRight: PropTypes.string,
    /**
     * Styles applied to the component when define as top left.
     */
    anchorOriginTopLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as top center.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom center.
     */
    anchorOriginBottomCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom left.
     */
    anchorOriginBottomLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom right.
     */
    anchorOriginBottomRight: PropTypes.string
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func,
  /**
   * The message to display.
   * @deprecated Instead use the label property
   */
  message: deprecatedPropType(PropTypes.node),
  /**
   * The message to display.
   */
  label: PropTypes.string,
  /**
   *  The anchor of the Snackbar. vertical: "top", "bottom" | horizontal: "left","center","right. It defines where the snackbar will end his animation
   */
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string
  }),
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar
   */
  autoHideDuration: PropTypes.number,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["default", "success", "error"]),
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Action to display.
   */
  action: PropTypes.node,
  /**
   * Duration of transition in milliseconds.
   */
  transitionDuration: PropTypes.number,
  /**
   * Direction of slide transition.
   */
  transitionDirection: PropTypes.oneOf(["up", "down", "left", "right"]),
  /**
   * Custom offset from top/bottom of the page, in px.
   */
  offset: PropTypes.number
};

HvSnackbar.defaultProps = {
  className: "",
  id: undefined,
  message: undefined,
  label: "",
  open: false,
  anchorOrigin: { vertical: "top", horizontal: "right" },
  onClose: null,
  autoHideDuration: 5000,
  customIcon: null,
  showIcon: false,
  action: null,
  variant: "default",
  transitionDuration: 300,
  transitionDirection: "left",
  offset: undefined
};

export default HvSnackbar;
