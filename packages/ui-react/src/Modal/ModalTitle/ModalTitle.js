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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";

/**
 * Title component of the modal.
 *
 * @param classes
 * @param children
 * @param disableTypography
 * @param others
 * @returns {*}
 * @constructor
 */
const ModalTitle = ({
  classes,
  children,
  variant,
  showIcon,
  customIcon,
  ...others
}) => {
  const isString = typeof children === "string";

  let icon = null;
  // inject the correct classes to the icon
  if (customIcon) {
    icon = React.cloneElement(customIcon, { className: classes.icon });
  } else if (showIcon) {
    icon = React.cloneElement(severityIcon(mapSeverityToVariant(variant)), {
      className: classes.icon
    });
  }

  return (
    <MuiDialogTitle className={classes.root} disableTypography {...others}>
      <div className={classes.messageContainer}>
        {icon}
        <div className={classNames({ [classes.textWithIcon]: icon })}>
          {!isString && children}
          {isString && <Typography variant="h4">{children}</Typography>}
        </div>
      </div>
    </MuiDialogTitle>
  );
};

ModalTitle.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the title).
     */
    root: PropTypes.string,
    /**
     * Style applied to the container of the title
     */
    messageContainer: PropTypes.string,
    /**
     * Style applied to the text when the icon is present.
     */
    textWithIcon: PropTypes.string,
    /**
     * Style applied to the icon.
     */
    icon: PropTypes.string
  }).isRequired,
  /**
   * Variant of the modal.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Node to be render.
   */
  children: PropTypes.node.isRequired
};

ModalTitle.defaultProps = {
  variant: "default",
  customIcon: null,
  showIcon: true
};

export default ModalTitle;
