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

import Level0Success16Color from "@hv-ui/icons/core/icons/Level0.S";
import Level3Alert16 from "@hv-ui/icons/core/icons/Level3.S";
import Level416Color from "@hv-ui/icons/core/icons/Level4.S";
import Level5Unsuccess16Color from "@hv-ui/icons/core/icons/Level5.S";
import theme from "@hv-ui/themes/dist/theme";
import React from "react";

/**
 * Icon mapping.
 *
 * @type {Readonly<{success: *, warning: *, error: *, info: *}>}
 */
export const variantIcon = Object.freeze({
  success: <Level0Success16Color color={["none", theme.palette.semantic.sema1]} />,
  warning: <Level416Color color={["none", theme.palette.semantic.sema5]} />,
  error: <Level5Unsuccess16Color color={["none", theme.palette.semantic.sema6]} />,
  info: <Level3Alert16 color={["none", theme.palette.semantic.sema4]} />
});

/**
 * Severity-icon mapping.
 *
 * @param {string} severity
 * @returns {*}
 */
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
