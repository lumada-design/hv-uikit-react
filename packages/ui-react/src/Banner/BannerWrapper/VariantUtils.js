/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import Level0Success16Color from "@hv-ui/icons/core/S-icons/Level0Success16Color";
import Level3Alert16 from "@hv-ui/icons/core/S-icons/Level3Alert16";
import Level416Color from "@hv-ui/icons/core/S-icons/Level416Color";
import Level5Unsuccess16Color from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import React from "react";

export const variantIcon = Object.freeze({
  success: <Level0Success16Color />,
  warning: <Level416Color />,
  error: <Level5Unsuccess16Color />,
  info: <Level3Alert16 />
});

export const severityIcon = severity => {
  let icon;
  switch (severity.toLowerCase()) {
    case "error":
      icon = variantIcon.error;
      break;
    case "warning":
      icon = variantIcon.warning;
      break;
    case "info":
      icon = variantIcon.info;
      break;
    default:
      icon = variantIcon.success;
      break;
  }

  return icon;
};

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
