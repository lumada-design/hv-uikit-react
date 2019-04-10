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
import HvBannerContentWrapper from "./BannerWrapper";

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
    open,
    onClose,
    message,
    anchorOrigin,
    variant,
    showIcon,
    customIcon,
    action,
    actionsOnMessage
  } = props;

  const anchorOriginBanner = { horizontal: "center", vertical: anchorOrigin };

  return (
    <Snackbar
      className={className}
      classes={classes}
      anchorOrigin={anchorOriginBanner}
      open={open}
      transitionDuration={0}
    >
      <HvBannerContentWrapper
        message={message}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
        onClose={onClose}
        actionsOnMessage={actionsOnMessage}
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
  message: PropTypes.string,
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
  action: PropTypes.node,
  /**
   * Actions to display on message.
   */
  actionsOnMessage: PropTypes.node
};

HvBanner.defaultProps = {
  className: "",
  message: "",
  anchorOrigin: "top",
  customIcon: null,
  showIcon: false,
  action: null,
  actionsOnMessage: null,
  variant: "default"
};

export default HvBanner;
