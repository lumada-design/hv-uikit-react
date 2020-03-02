import React from "react";
import Success from "@hv/uikit-react-icons/dist/Success";
import Error from "@hv/uikit-react-icons/dist/Fail";

export const variantIcon = Object.freeze({
  success: () => <Success iconSize="S" semantic="sema1" />,
  error: () => <Error iconSize="S" semantic="sema4" />
});

export const severityIcon = (severity, theme) => {
  switch (severity.toLowerCase()) {
    case "error":
      return variantIcon.error(theme);
    default:
      return variantIcon.success(theme);
  }
};

export const mapSeverityToVariant = severity => {
  switch (severity.toLowerCase()) {
    case "error":
      return "error";
    default:
      return "default";
  }
};
