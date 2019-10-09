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
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Error from "@hv/uikit-react-icons/dist/Generic/Fail";
import styles from "./styles";

const StyledSuccess = withStyles(styles, { withTheme: true })(Success);
const StyledError = withStyles(styles, { withTheme: true })(Error);

export const variantIcon = Object.freeze({
  success: () => <StyledSuccess iconSize="S" semantic="sema1" />,
  error: () => <StyledError iconSize="S" semantic="sema4" />,
});

export const severityIcon = (severity, theme) => {
  let icon;
  switch (severity.toLowerCase()) {
    case "error":
      icon = variantIcon.error(theme);
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
    case "error":
      variant = "error";
      break;
    default:
      variant = "default";
  }
  return variant;
};
