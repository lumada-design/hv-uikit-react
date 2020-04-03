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

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Level0 from "@hv/uikit-react-icons/dist/Generic/Level0.Good";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import Level4 from "@hv/uikit-react-icons/dist/Generic/Level4";
import Level5 from "@hv/uikit-react-icons/dist/Generic/Level5";

const styles = () => ({
  rootM: {
    padding: "4px"
  }
});

const StyledLevel0 = withStyles(styles, {
  name: "HvModalTitleLevel0",
  withTheme: true
})(Level0);
const StyledLevel3 = withStyles(styles, {
  name: "HvModalTitleLevel3",
  withTheme: true
})(Level3);
const StyledLevel4 = withStyles(styles, {
  name: "HvModalTitleLevel4",
  withTheme: true
})(Level4);
const StyledLevel5 = withStyles(styles, {
  name: "HvModalTitleLevel5",
  withTheme: true
})(Level5);

/**
 * Icon mapping.
 *
 * @type {Readonly<{success: *, warning: *, error: *, info: *}>}
 */
export const variantIcon = Object.freeze({
  success: () => <StyledLevel0 iconSize="M" semantic="sema1" />,
  warning: () => <StyledLevel4 iconSize="M" semantic="sema5" />,
  error: () => <StyledLevel5 iconSize="M" semantic="sema6" />,
  info: () => <StyledLevel3 iconSize="M" semantic="sema4" />
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
