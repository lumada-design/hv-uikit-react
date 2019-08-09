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

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import diff from "deep-diff";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import createTypography from "@material-ui/core/styles/createTypography";
import createPalette from "@material-ui/core/styles/createPalette";
import { ConfigProvider } from "../config/context";
import { themeBuilder } from "../theme";

const muiDefaultPalette = createPalette({});
const muiDefaultTypography = createTypography(muiDefaultPalette, {
  useNextVariants: true,
  suppressDeprecationWarnings: true
});

const muiDefaultTheme = createMuiTheme({
  palette: muiDefaultPalette,
  typography: muiDefaultTypography
});

/**
 * Augments the target theme with the differences found in the source theme.
 *
 * @param {Object} InputTargetTheme - A material UI Theme to be changed.
 * @param {Object} InputSourceTheme - A material UI Theme to apply on top.
 * @returns {Object} - A new modified material UI theme.
 */
const applyCustomTheme = (InputTargetTheme, InputSourceTheme) => {
  const targetTheme = _.cloneDeep(InputTargetTheme);
  const sourceTheme = _.cloneDeep(InputSourceTheme);
  const deleteDifference = "D";
  if (
    !_.isNil(targetTheme) &&
    !_.isNil(sourceTheme) &&
    !_.isEmpty(targetTheme) &&
    !_.isEmpty(sourceTheme)
  ) {
    diff.observableDiff(muiDefaultTheme, sourceTheme, difference => {
      const partialCustomTheme = _.set({}, difference.path, difference.rhs);
      if (difference.kind !== deleteDifference) {
        // Do not include the differences of type "delete"
        _.merge(targetTheme, partialCustomTheme);
      }
    });
    return targetTheme;
  }
  return targetTheme;
};

const HvProvider = ({ children, theme, uiKitTheme, changeTheme, router }) => {
  const pConfig = { router, changeTheme };

  const customTheme = applyCustomTheme(themeBuilder(uiKitTheme), theme);
  return (
    <MuiThemeProvider theme={customTheme} sheetsManager={new Map()}>
      <CssBaseline />
      <ConfigProvider value={pConfig}>{children}</ConfigProvider>
    </MuiThemeProvider>
  );
};

HvProvider.propTypes = {
  children: PropTypes.node.isRequired,
  /** 
   * The material theme object that can be used to override the defaults 
   */
  theme: PropTypes.instanceOf(Object),
  /** 
   * Which of design system default themes to use.
   */
  uiKitTheme: PropTypes.oneOf(["dawn", "wicked"]),
  /** 
   * Which of design system default themes to use.
   */
  changeTheme: PropTypes.func,
  /** 
   * Configuration object for routing, exposes push and prefetch
   */
  router: PropTypes.instanceOf(Object)
};

HvProvider.defaultProps = {
  theme: null,
  router: null,
  uiKitTheme: "dawn",
  changeTheme: () => {}
};

export default HvProvider;
