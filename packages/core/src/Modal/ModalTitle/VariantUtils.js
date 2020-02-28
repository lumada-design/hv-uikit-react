import React from "react";
import Level0 from "@hv/uikit-react-icons/dist/Level0.Good";
import Level3 from "@hv/uikit-react-icons/dist/Level3.Bad";
import Level4 from "@hv/uikit-react-icons/dist/Level4";
import Level5 from "@hv/uikit-react-icons/dist/Level5";

/**
 * Icon mapping.
 *
 * @type {Readonly<{success: *, warning: *, error: *, info: *}>}
 */
export const variantIcon = Object.freeze({
  success: () => <Level0 iconSize="M" semantic="sema1" />,
  warning: () => <Level4 iconSize="M" semantic="sema5" />,
  error: () => <Level5 iconSize="M" semantic="sema6" />,
  info: () => <Level3 iconSize="M" semantic="sema4" />
});

export const severityIcon = (severity, theme) => {
  let icon;
  switch (severity.toLowerCase()) {
    case "error":
      icon = variantIcon.error(theme);
      break;
    case "warning":
      icon = variantIcon.warning(theme);
      break;
    case "info":
      icon = variantIcon.info(theme);
      break;
    default:
      icon = variantIcon.success(theme);
      break;
  }

  return icon;
};

/**
 *
 *
 * @param {string}severity
 * @returns {string}
 */
export const mapSeverityToVariant = severity => {
  let variant;
  switch (severity.toLowerCase()) {
    case "catastrophic":
    case "error":
      variant = "error";
      break;
    case "critical":
    case "warning":
      variant = "warning";
      break;
    case "marginal":
    case "info":
      variant = "info";
      break;
    default:
      variant = "default";
  }
  return variant;
};
