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

import React, { useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import uniqueId from "lodash/uniqueId";
import HvBannerContentWrapper from "./BannerWrapper";

// TODO: review to use makeStyles during the Material 4 upgrade as 4988d7987a4fecf6bb33d539d476885d95acb8f8

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Banner component. This component has as base the snackbar, as the functionalities are identical. The main logic is
 * set in the HvBannerContentWrapper.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HvBanner = props => {
  const {
    classes,
    className,
    id,
    open,
    onClose,
    anchorOrigin,
    variant,
    transitionDuration,
    transitionDirection,
    showIcon,
    customIcon,
    actions,
    actionsCallback,
    actionsPosition,
    label,
    offset,

    // deprecated:
    message,
    action,
    actionsOnMessage
  } = props;

  const anchorOriginOffset = offset && {
    anchorOriginTop: {
      top: `${offset}px`
    },
    anchorOriginBottom: {
      bottom: `${offset}px`
    }
  };

  const [bannerId] = useState(id || uniqueId("hv-banner-"));
  const anchorOriginBanner = { horizontal: "center", vertical: anchorOrigin };

  const SlideTransition = properties => (
    <Slide {...properties} direction={transitionDirection} />
  );

  const bannerClasses = {
    anchorOriginTopCenter: classes.anchorOriginTopCenter,
    anchorOriginBottomCenter: classes.anchorOriginBottomCenter
  };
  bannerClasses.root = open ? classes.root : classes.rootClosed;

  // deprecated properties fallbacks (start):
  let effectiveActions = actions;
  if(actionsOnMessage != null) {
    effectiveActions = actionsOnMessage;
  } else if(action != null) {
    effectiveActions = action;
  }

  let effectiveActionsPosition = actionsPosition;
  if(actionsPosition === "auto") {
    if(actionsOnMessage != null) {
      effectiveActionsPosition = "inline";
    } else if(action != null) {
      effectiveActionsPosition = "bottom-right";
    }
  }
  // deprecated properties fallbacks (end)

  return (
    <Snackbar
      {...offset && {
        style:
          anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin)}`]
      }}
      className={className}
      id={bannerId}
      classes={bannerClasses}
      anchorOrigin={anchorOriginBanner}
      TransitionComponent={SlideTransition}
      open={open}
      transitionDuration={transitionDuration}
    >
      <HvBannerContentWrapper
        id={`${bannerId}-content`}
        content={message || label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        actions={effectiveActions}
        actionsCallback={actionsCallback}
        actionsPosition={effectiveActionsPosition}
        onClose={onClose}
      />
    </Snackbar>
  );
};

HvBanner.propTypes = {
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
     * Styles applied to the component when define as top.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom.
     */
    anchorOriginBottomCenter: PropTypes.string
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The message to display.
   */
  label: PropTypes.string,
  /**
   *  The anchor of the Snackbar.
   */
  anchorOrigin: PropTypes.oneOf(["top", "bottom"]),
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
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
   * How much the transition animation last in milliseconds, if 0 no animation is played.
   */
  transitionDuration: PropTypes.number,
  /**
   * Direction of slide transition.
   */
  transitionDirection: PropTypes.oneOf(["up", "down", "left", "right"]),
  /**
   * Custom offset from top/bottom of the page, in px.
   */
  offset: PropTypes.number,

  // deprecated:
  /**
   * The message to display.
   * @deprecated. Instead use the label property
   */
  message: deprecatedPropType(
    PropTypes.string,
    "Instead use the label property"
  ),
  /**
   * Actions to display on the right side.
   * @deprecated. Instead use the actions property
   */
  action: deprecatedPropType(
    PropTypes.node,
    "Instead use the actions property"
  ),
  /**
   * Actions to display on message.
   * @deprecated. Instead use the actions property together with actionsPosition="inline"
   */
  actionsOnMessage: deprecatedPropType(
    PropTypes.node,
    "Instead use the actions property together with actionsPosition=\"inline\""
  )
};

HvBanner.defaultProps = {
  className: "",
  id: undefined,
  label: "",
  anchorOrigin: "top",
  customIcon: null,
  showIcon: false,
  actions: null,
  actionsCallback: () => {},
  actionsPosition: "auto",
  variant: "default",
  transitionDuration: 300,
  transitionDirection: "down",
  offset: undefined,

  // deprecated:
  message: undefined,
  action: undefined,
  actionsOnMessage: undefined
};

export default HvBanner;
