import { useCallback, useEffect, useMemo, useState } from "react";
import { EmotionCache } from "@emotion/cache";
import {
  HvThemeContext,
  type HvThemeContextValue,
} from "@hitachivantara/uikit-react-shared";
import {
  applyTheme,
  ds5,
  getMode,
  getTheme,
  getThemesVars,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";

import { useUniqueId } from "../hooks/useUniqueId";
import { EmotionProvider } from "./EmotionProvider";
import { MuiProvider } from "./MuiProvider";

// Provider props
export interface HvProviderProps {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * Id of your root element.
   */
  rootElementId?: string;
  /**
   * By default the baseline styles are applied globally, `global`, to the application for the UI Kit components to work properly.
   * If you need to scope the baseline styles to avoid styling conflicts, you can set this property to `scoped`.
   * To scope the baseline to your root, you need to add the `rootElementId` property.
   * If the `rootElementId` property is not set, the baseline will be scoped to a new container, `hv-uikit-scoped-root*`, created around your content.
   * If you are providing your own baseline styles, you can set this property to `none` to disable the baseline styles.
   */
  cssBaseline?: "global" | "scoped" | "none";
  /**
   * By default the theme styles are applied globally, `global`, to the application.
   * If you need to scope the theme styles to avoid styling conflicts, you can set this property to `scoped`.
   * To scope the theme to your root, you need to add the `rootElementId` property.
   * If the `rootElementId` property is not set, the theme will be scoped to a new container, `hv-uikit-scoped-root*`, created around your content.
   */
  cssTheme?: "global" | "scoped";
  /**
   * The string used to prefix the class names and uniquely identify them. The key can only contain lower case alphabetical characters.
   * This is useful to avoid class name collisions.
   *
   * If `emotionCache` is passed, this is value is ignored.
   *
   * @default "hv"
   */
  classNameKey?: string;
  /**
   * The emotion cache instance to use. If no value is provided, the default cache is used.
   */
  emotionCache?: EmotionCache;
  /**
   * List of themes to be used by UI Kit.
   * You can provide your own themes created with the `createTheme` utility and/or the default themes `ds3` and `ds5` provided by UI Kit.
   *
   * If no value is provided, the `ds5` theme will be used.
   */
  themes?: HvThemeStructure[];
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
}

/**
 * Enables theming capabilities and makes cross-component theme properties available down the tree.
 */
export const HvProvider = ({
  children,
  rootElementId,
  cssBaseline = "global",
  cssTheme = "global",
  themes: initialThemes,
  theme: initialTheme,
  colorMode: initialMode,
  emotionCache,
  classNameKey,
}: HvProviderProps) => {
  const generatedId = useUniqueId();
  const scopedRootId = `${"hv-uikit-scoped-root"}-${generatedId}`;

  const themes = useMemo(
    () => (initialThemes?.length ? initialThemes : [ds5]),
    [initialThemes],
  );

  const [theme, setTheme] = useState(() => getTheme(themes, initialTheme));
  const [mode, setMode] = useState(() => getMode(theme, initialMode));

  const rootId =
    cssTheme === "scoped" ? rootElementId || scopedRootId : undefined;

  const changeTheme = useCallback(
    (themeName?: string, themeMode?: string) => {
      const newTheme = getTheme(themes, themeName);
      const newMode = getMode(newTheme, themeMode);
      setTheme(newTheme);
      setMode(newMode);
    },
    [themes],
  );

  useEffect(() => {
    applyTheme(theme, mode, rootId);
  }, [theme, mode, rootId]);

  // review in v6 so that theme/colorMode isn't both controlled & uncontrolled
  useEffect(() => {
    changeTheme(initialTheme, initialMode);
  }, [initialTheme, initialMode, changeTheme]);

  const contextValue = useMemo<HvThemeContextValue>(
    () => ({
      themes: themes.map((t) => t.name),
      activeTheme: theme as any,
      selectedTheme: theme.name,
      colorModes: Object.keys(theme.colors.modes),
      selectedMode: mode,
      changeTheme,
      rootId,
    }),
    [themes, theme, mode, changeTheme, rootId],
  );

  return (
    <HvThemeContext.Provider value={contextValue}>
      <MuiProvider theme={theme} mode={mode}>
        <EmotionProvider
          rootId={rootElementId}
          scopedId={scopedRootId}
          themesVars={getThemesVars(themes)}
          cssBaseline={cssBaseline}
          cssTheme={cssTheme}
          emotionCache={emotionCache}
          classNameKey={classNameKey}
        >
          {children}
        </EmotionProvider>
      </MuiProvider>
    </HvThemeContext.Provider>
  );
};
