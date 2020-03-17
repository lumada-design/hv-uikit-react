import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { DialogTitle, withStyles } from "@material-ui/core";
import HvTypography from "../../Typography";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";
import styles from "./styles";

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
  className = "",
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
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
    <DialogTitle className={clsx(classes.root, className)} disableTypography {...others}>
      <div className={classes.messageContainer}>
        {icon}
        <div className={clsx({ [classes.textWithIcon]: icon })}>
          {!isString && children}
          {isString && <HvTypography variant="sTitle">{children}</HvTypography>}
        </div>
      </div>
    </DialogTitle>
  );
};

ModalTitle.propTypes = {
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

export default withStyles(styles, { name: "HvModalTitle" })(ModalTitle);
