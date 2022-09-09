import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import set from "lodash/set";
import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import diff from "deep-diff";

import "focus-within-polyfill";
import "focus-visible";

import { createTheme, ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  themeBuilder,
  createGenerateClassName,
  HvCssBaseline,
  getTheme,
  HvScopedCssBaseline,
} from "../theme";

import ConfigContext from "./context";

/**
 * Augments the target theme with the differences found in the source theme.
 *
 * @param {Object} InputTargetTheme - A material UI Theme to be changed.
 * @param {Object} InputSourceTheme - A material UI Theme to apply on top.
 * @returns {Object} - A new modified material UI theme.
 */
const applyCustomTheme = (InputTargetTheme, InputSourceTheme) => {
  const muiDefaultTheme = createTheme();
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

/**
 * This component makes cross-component properties, like the active `theme` and `locale`,
 * available down the React tree thanks to React context.
 *
 * This component should preferably be used at **the root of your component tree** and
 * be unique in the App in most cases.
 *
 * ```jsx
 * <HvProvider>
 *   <MyApp />
 * <HvProvider/>
 * ```
 *
 * If several `HvProvider`'s are used, either nested or in parallel, the `generateClassNameOptions`
 * must be tweaked to avoid CSS classnames collision. Or a custom JSS's class name generator can
 * be provided via the `generateClassName` property.
 *
 * **UI Kit components will not work at all if the `HvProvider` is not configured correctly**,
 * as they will not be able to access the properties of the active theme..
 *
 */
const HvProvider = ({
  children,

  uiKitTheme = "dawn",
  theme = null,
  changeTheme = () => {},

  locale = "en-US",

  generateClassName: generateClassNameProp,
  generateClassNameOptions,
  disableStylesGeneration = false,

  cssBaseline = "global",
}) => {
  const [localeSetting, setLocaleSetting] = useState(locale);

  useEffect(() => {
    // ssr - only runs at the rendering phase, so it won't run on the server
    setLocaleSetting(locale || navigator?.language);
  }, [locale]);

  const rawUiKitTheme = getTheme(uiKitTheme);
  const customTheme = applyCustomTheme(themeBuilder(rawUiKitTheme), theme);

  const generateClassName =
    generateClassNameProp || createGenerateClassName(generateClassNameOptions);

  const pConfig = useMemo(
    () => ({ changeTheme, locale: localeSetting }),
    [changeTheme, localeSetting]
  );

  const renderCssBaseline = () => {
    if (cssBaseline === "global") {
      return <HvCssBaseline />;
    }
    if (cssBaseline === "scoped") {
      return <HvScopedCssBaseline />;
    }
    return null;
  };

  return (
    <StyledEngineProvider injectFirst>
      <StylesProvider
        generateClassName={generateClassName}
        disableGeneration={disableStylesGeneration}
      >
        <ThemeProvider theme={customTheme}>
          {renderCssBaseline()}
          <ConfigContext.Provider value={pConfig}>{children}</ConfigContext.Provider>
        </ThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  );
};

HvProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node.isRequired,

  /**
   * The Design System base theme in use. Defaults to `"dawn"`.
   */
  uiKitTheme: PropTypes.oneOf(["dawn", "wicked"]),
  /**
   * The UI Kit theme object to be applied on top of the base theme.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * Function stored in the provider's context to allow runtime switching of the active theme.
   * The implementation is up to each App.
   */
  changeTheme: PropTypes.func,

  /**
   * The locale to be used.
   * Defaults to the browser's configured locale or "en-US" if not available.
   */
  locale: PropTypes.string,

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
   * Disables the generation of the styles.
   */
  disableStylesGeneration: PropTypes.bool,
  /**
   * By default the baseline styles are applied globally to the application.
   * If you need to scope the CSS to avoid styling conflicts, you can set this prop to `"scoped"`.
   * If you are providing the baseline styles, you can set this prop to false.
   *
   * @see https://lumada-design.github.io/uikit/master/?path=/docs/theme-css-baseline--page
   */
  cssBaseline: PropTypes.oneOf(["global", "scoped", "none"]),
};

export default HvProvider;
