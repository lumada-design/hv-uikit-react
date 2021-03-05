import React from "react";
import PropTypes from "prop-types";

import set from "lodash/set";
import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import diff from "deep-diff";

import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
  createMuiTheme,
} from "@material-ui/core";

import { themeBuilder, createGenerateClassName, CssBaseline, getTheme } from "../theme";

import { ConfigProvider } from "../config/context";

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

const HvProvider = ({
  children,

  theme = null,
  uiKitTheme = "dawn",
  changeTheme = () => {},

  generateClassName: generateClassNameProp,
  generateClassNameOptions,
  injectStylesFirst = false,
  disableStylesGeneration = false,
}) => {
  const rawUiKitTheme = getTheme(uiKitTheme);
  const customTheme = applyCustomTheme(themeBuilder(rawUiKitTheme), theme);

  const generateClassName =
    generateClassNameProp || createGenerateClassName(generateClassNameOptions);

  const pConfig = { changeTheme };

  return (
    <MuiStylesProvider
      generateClassName={generateClassName}
      injectFirst={injectStylesFirst}
      disableGeneration={disableStylesGeneration}
    >
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

  /**
   * Custom JSS's class name generator.
   */
  generateClassName: PropTypes.func,
  /**
   * Built-in JSS's class name generator options.
   * Ignored if a custom `generateClassName` is provided.
   *
   * `disableGlobal`: Disable the generation of deterministic class names. Defaults to `false`.
   *
   * `productionPrefix`: The string used to prefix the class names in production. Defaults to `"jss-uikit"`.
   *
   * `seed`: The string used to uniquely identify the generator. Defaults to `""`.
   *         It can be used to avoid class name collisions when using multiple generators in the same document.
   */
  generateClassNameOptions: PropTypes.shape({
    /**
     * Disable the generation of deterministic class names. Defaults to `false`.
     */
    disableGlobal: PropTypes.bool,
    /**
     * The string used to prefix the class names in production. Defaults to `"jss-uikit"`.
     */
    productionPrefix: PropTypes.string,
    /**
     * The string used to uniquely identify the generator. Defaults to `""`.
     * It can be used to avoid class name collisions when using multiple generators in the same document.
     */
    seed: PropTypes.string,
  }),
  /**
   * Injects the generated stylesheets at the top of the `<head>` element of the page.
   * This can ease the override of UI Kit components styles.
   *
   * By default, the styles are injected last in the `<head>` element of the page.
   */
  injectStylesFirst: PropTypes.bool,
  /**
   * Disables the generation of the styles.
   */
  disableStylesGeneration: PropTypes.bool,
};

export default HvProvider;
