import React from "react";
import PropTypes from "prop-types";

import set from "lodash/set";
import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import diff from "deep-diff";

import "focus-within-polyfill";
import "focus-visible";

import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
  createMuiTheme,
} from "@material-ui/core";

import { themeBuilder, generateClassName, CssBaseline, getTheme } from "../theme";

import { ConfigProvider } from "./context";

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
    diff.observableDiff(muiDefaultTheme, sourceTheme, (difference) => {
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

const HvProvider = ({ children, theme = null, uiKitTheme = "dawn", changeTheme = () => {} }) => {
  const pConfig = { changeTheme };
  const rawUiKitTheme = getTheme(uiKitTheme);
  const customTheme = applyCustomTheme(themeBuilder(rawUiKitTheme), theme);

  window.hvTheme = customTheme;

  return (
    <MuiStylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <ConfigProvider value={pConfig}>{children}</ConfigProvider>
      </MuiThemeProvider>
    </MuiStylesProvider>
  );
};

HvProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node.isRequired,
  /**
   * The UI-Kit theme object to be wrapped by the MUI theme.
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
};

export default HvProvider;
