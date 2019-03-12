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
import HvSnackBarContentWrapper from "../SnackbarContentWrapper";

const HvSnackbar = props => {
  const {
    classes,
    open,
    onClose,
    message,
    anchorOrigin,
    autoHideDuration,
    variant,
    showIcon,
    customIcon,
    action
  } = props;

  return (
    <Snackbar
      classes={classes}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={0}
    >
      <HvSnackBarContentWrapper
        message={message}
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
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
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
   */
  message: PropTypes.node,
  /**
   *  The anchor of the Snackbar.
   */
  anchorOrigin: PropTypes.instanceOf(Object),
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar
   */
  autoHideDuration: PropTypes.number,
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
   * Action to display.
   */
  action: PropTypes.node
};

HvSnackbar.defaultProps = {
  message: "",
  open: false,
  anchorOrigin: { vertical: "top", horizontal: "right" },
  onClose: null,
  autoHideDuration: 2000,
  customIcon: null,
  showIcon: false,
  action: null,
  variant: "default"
};

export default HvSnackbar;
