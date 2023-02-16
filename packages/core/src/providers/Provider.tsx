import { css, Global } from "@emotion/react";
import { CssBaseline, getThemesVars } from "@hitachivantara/uikit-styles";
import { parseThemes } from "utils";
import { HvTheme } from "types/theme";
import { HvThemeProvider } from "./ThemeProvider";

// Provider props
export type HvProviderProps = {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * By default the baseline styles are applied globally to the application to avoid styling conflicts and for the UI Kit components to work properly.
   * If you are providing your own baseline styles, you can set this property to false.
   */
  enableCssBaseline?: boolean;
  /**
   * Id of your root element. The theme's attributes and CSS variables will be set in this element.
   * If no value is provided, the document's body will be used.
   */
  rootElementId?: string;
  /**
   * The UI Kit theme object used to set the theme and inject the customizations needed to meet specific design needs.
   * If no value is provided, the default theme and mode will be `"ds5"` and `"dawn"`, respectively.
   */
  theme?: HvTheme;
};

/**
 * This component makes cross-component theme properties available down the React tree thanks to React context.
 *
 * The `HvProvider` should preferably be used at **the root of your component tree** and
 * be unique in the App in most cases.
 *
 * ```jsx
 * <HvProvider>
 *   <MyApp />
 * <HvProvider/>
 * ```
 *
 * If several `HvProvider`'s are used in parallel, you'll need to create different root elements and
 * set the `rootElementId` property for each one of the providers. Otherwise, the styling will not work properly.
 *
 * **UI Kit components will not work at all if the `HvProvider` is not configured correctly**,
 * as they will not be able to access the properties of the active theme.
 *
 */
export const HvProvider = ({
  children,
  rootElementId,
  enableCssBaseline = true,
  theme = {},
}: HvProviderProps) => {
  const {
    baseTheme = "ds5",
    baseColorMode = "dawn",
    name,
    ...customizations
  } = theme;

  // Get themes list
  const themes = parseThemes(baseTheme, name, customizations);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getThemesVars(themes)}
        `}
      />
      <HvThemeProvider
        themes={themes}
        theme={name || baseTheme}
        colorMode={baseColorMode}
        rootElementId={rootElementId}
      >
        {children}
      </HvThemeProvider>
    </>
  );
};

if (process.env.NODE_ENV !== "production") {
  HvProvider.displayName = "Provider";
}
