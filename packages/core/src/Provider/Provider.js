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
import PropTypes from "prop-types";
import set from "lodash/set";
import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import diff from "deep-diff";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { ConfigProvider } from "../config/context";
import { themeBuilder } from "../theme";

/**
 * Augments the target theme with the differences found in the source theme.
 *
 * @param {Object} InputTargetTheme - A material UI Theme to be changed.
 * @param {Object} InputSourceTheme - A material UI Theme to apply on top.
 * @returns {Object} - A new modified material UI theme.
 */
const applyCustomTheme = (InputTargetTheme, InputSourceTheme) => {
  const muiDefaultTheme = createMuiTheme();
  const targetTheme = cloneDeep(InputTargetTheme);
  const sourceTheme = cloneDeep(InputSourceTheme);
  const deleteDifference = "D";
  if (!isEmpty(targetTheme) && !isEmpty(sourceTheme)) {
    diff.observableDiff(muiDefaultTheme, sourceTheme, difference => {
      const partialCustomTheme = set({}, difference.path, difference.rhs);
      if (difference.kind !== deleteDifference) {
        // Do not include the differences of type "delete"
        merge(targetTheme, partialCustomTheme);
      }
    });
    return targetTheme;
  }
  return targetTheme;
};

const HvProvider = ({ children, theme, uiKitTheme, changeTheme, router }) => {
  const pConfig = { router, changeTheme };

  const customTheme = applyCustomTheme(themeBuilder(uiKitTheme), theme);
  window.hvTheme = customTheme;
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ConfigProvider value={pConfig}>{children}</ConfigProvider>
    </ThemeProvider>
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
