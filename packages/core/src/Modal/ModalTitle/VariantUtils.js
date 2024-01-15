import React from "react";
import { Fail, Info, Success, Caution } from "@hitachivantara/uikit-react-icons";

/**
 * Icon mapping.
 *
 * @type {Readonly<{success: *, warning: *, error: *, info: *}>}
 */
export const variantIcon = Object.freeze({
  success: () => <Success iconSize="M" semantic="sema1" />,
  warning: () => <Caution iconSize="M" semantic="sema3" />,
  error: () => <Fail iconSize="M" semantic="sema4" />,
  info: () => <Info iconSize="M" />,
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

export const mapSeverityToVariant = (severity) => {
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
