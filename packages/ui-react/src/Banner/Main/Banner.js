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
import Snackbar from "@material-ui/core/Snackbar";
import HvBannerContentWrapper from "../BannerWrapper";

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
   * A Jss Object used to override or extend the styles applied to the banner.
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
  open: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The message to display.
   */
  message: PropTypes.node,
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
  open: false,
  anchorOrigin: "top",
  customIcon: null,
  showIcon: false,
  action: null,
  actionsOnMessage: null,
  variant: "default"
};

export default HvBanner;
