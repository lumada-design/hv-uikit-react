import { css, Global, CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  getThemesVars,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";
import { processThemes } from "utils";
import { HvTheme } from "../types/theme";
import { HvThemeProvider } from "./ThemeProvider";
import { useMemo } from "react";
import createCache from "@emotion/cache";

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
   *
   * If no value is provided, the document's body will be used.
   */
  rootElementId?: string;
  /**
   * List of themes to be used by UI Kit.
   * You can provide your own themes created with the `createTheme` utility and/or the default themes `ds3` and `ds5` provided by UI Kit.
   *
   * If no value is provided, the `ds5` theme will be used.
   */
  themes?: (HvTheme | HvThemeStructure)[];
  /**
   * The active theme. It must be one of the themes passed to `themes`.
   *
   * If no value is provided, the first theme from the `themes` list is used. If no `themes` list is provided, the `ds5` theme will be used.
   */
  theme?: string;
  /**
   * The active color mode. It must be one of the color modes of the active theme.
   *
   * If no value is provided, the first color mode defined in the active theme is used.
   * For the default themes `ds3` and `ds5`, the `dawn` color mode is the one used.
   */
  colorMode?: string;
  /**
   * The string used to prefix the class names and uniquely identify them. The key can only contain lower case alphabetical characters.
   * This is useful to avoid class name collisions.
   *
   * If no value is provided, the default is `hv-uikit-css`.
   */
  classNameKey?: string;
};

/**
 * Enables theming capabilities and makes cross-component theme properties available down the tree.
 */
export const HvProvider = ({
  children,
  rootElementId,
  enableCssBaseline = true,
  themes,
  theme,
  colorMode,
  classNameKey = "hv-uikit-css",
}: HvProviderProps) => {
  // Themes
  const themesList: (HvTheme | HvThemeStructure)[] = processThemes(themes);

  // Emotion cache
  // Moves UI Kit styles to the top of the <head> so they're loaded first.
  // This enables users to override the UI Kit styles if necessary.
  const emotionCache = useMemo(
    () =>
      createCache({
        key: classNameKey,
        prepend: true,
      }),
    [classNameKey]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getThemesVars(themesList)}
        `}
      />
      <HvThemeProvider
        themes={themesList}
        theme={theme || themesList[0].name}
        colorMode={colorMode || Object.keys(themesList[0].colors.modes)[0]}
        rootElementId={rootElementId}
        classNameKey={classNameKey}
      >
        {children}
      </HvThemeProvider>
    </CacheProvider>
  );
};
