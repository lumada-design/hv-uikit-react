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

/**
 * Defines the props for the `HvProvider` component.
 */
export interface HvProviderProps {
  /** A collection of themes to be used in the application. */
  themes?: HvThemeStructure[];
  /** The initial theme name.  */
  theme?: string;
  /** The initial color mode key. */
  colorMode?: string;
  /** The ID of the root element to apply the theme to. Defaults to the document's root element. */
  rootElementId?: string;
  /**
   * Controls how baseline styles are applied.
   * - `global`: Inject baseline styles globally (default).
   * - `scoped`: Inject baseline styles scoped to a specific root.
   * - `none`: Do not inject any baseline styles.
   */
  cssBaseline?: "global" | "scoped" | "none";
  /**
   * Controls how theme styles are applied.
   * - `global`: Inject theme globally (default).
   * - `scoped`: Apply theme to a scoped root container.
   */
  cssTheme?: "global" | "scoped";
  /**  Optionally provide a custom Emotion cache instance. */
  emotionCache?: EmotionCache;
  /**
   * A unique prefix to avoid Emotion class name collisions.
   * If `emotionCache` is provided, this value is ignored.
   *
   * @default "hv"
   */
  classNameKey?: string;
  /** Your component tree. */
  children?: React.ReactNode;
}

/**
 * The `HvProvider` enables theming and baseline styling using the UI Kit.
 */
export const HvProvider = ({
  themes: initialThemes,
  theme: initialTheme,
  colorMode: initialMode,
  rootElementId,
  cssBaseline = "global",
  cssTheme = "global",
  emotionCache,
  classNameKey,
  children,
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
          scopeId={scopedRootId}
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
