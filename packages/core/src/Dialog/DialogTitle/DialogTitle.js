import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { DialogTitle } from "@mui/material";
import { withStyles } from "@mui/styles";
import HvTypography from "../../Typography";
import iconVariant from "../../utils/iconVariant";
import styles from "./styles";

const HvDialogTitle = ({
  classes,
  className,
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
  ...others
}) => {
  const isString = typeof children === "string";

  const icon = customIcon || (showIcon && iconVariant(variant));

  return (
    <DialogTitle className={clsx(classes.root, className)} {...others}>
      <div className={classes.messageContainer}>
        {icon}
        <div className={clsx({ [classes.textWithIcon]: icon })}>
          {!isString && children}
          {isString && <HvTypography variant="xxsTitle">{children}</HvTypography>}
        </div>
      </div>
    </DialogTitle>
  );
};

HvDialogTitle.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    icon: PropTypes.string,
    /**
     * Style applied to the close button.
     */
    closeButton: PropTypes.string,
  }).isRequired,
  /**
   * Variant of the Dialog.
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
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvDialogTitle" })(HvDialogTitle);
