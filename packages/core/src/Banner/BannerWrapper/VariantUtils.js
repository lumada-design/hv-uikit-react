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

import Level0Success16Color from "@hv/uikit-react-icons/dist/Level0.S";
import Level3Alert16 from "@hv/uikit-react-icons/dist/Level3.S";
import Level416Color from "@hv/uikit-react-icons/dist/Level4.S";
import Level5Unsuccess16Color from "@hv/uikit-react-icons/dist/Level5.S";
import React from "react";

export const variantIcon = Object.freeze({
  success: theme => <Level0Success16Color color={["none", theme.hv.palette.semantic.sema1]} />,
  warning: theme => <Level416Color color={["none", theme.hv.palette.semantic.sema5]} />,
  error: theme => <Level5Unsuccess16Color color={["none", theme.hv.palette.semantic.sema6]} />,
  info: theme => <Level3Alert16 color={["none", theme.hv.palette.semantic.sema4]} />
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
