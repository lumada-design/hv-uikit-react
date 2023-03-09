import { css, Global, CacheProvider } from "@emotion/react";
import { CssBaseline, getThemesVars } from "@hitachivantara/uikit-styles";
import { parseThemes } from "utils";
import { HvTheme } from "../types/theme";
import { HvThemeProvider } from "./ThemeProvider";
import { emotionCache } from "emotion";

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
 * Enables theming capabilities and makes cross-component theme properties available down the tree.
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
    inheritColorModes = true,
    name,
    ...customizations
  } = theme;

  // Get themes list
  const themes = parseThemes(
    baseTheme,
    name,
    inheritColorModes,
    customizations
  );

  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
};

if (process.env.NODE_ENV !== "production") {
  HvProvider.displayName = "Provider";
}
