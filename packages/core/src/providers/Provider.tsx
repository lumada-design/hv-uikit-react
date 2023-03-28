import {
  css as cssReact,
  Global,
  CacheProvider,
  ClassNames,
} from "@emotion/react";
import {
  CssBaseline,
  CssScopedBaseline,
  getThemesVars,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";
import { processThemes } from "utils";
import { HvTheme } from "../types/theme";
import { HvThemeProvider } from "./ThemeProvider";
import React, { useMemo } from "react";
import createCache from "@emotion/cache";
import { useUniqueId } from "hooks";

// Provider props
export type HvProviderProps = {
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
   * If no value is provided, the default is `hv-uikit-css`.
   */
  classNameKey?: string;
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
};

const scopedRootPrefix = "hv-uikit-scoped-root" as const;

/**
 * Enables theming capabilities and makes cross-component theme properties available down the tree.
 */
export const HvProvider = ({
  children,
  rootElementId,
  cssBaseline = "global",
  cssTheme = "global",
  themes,
  theme,
  colorMode,
  classNameKey = "hv-uikit-css",
}: HvProviderProps) => {
  const scopedRootId = useUniqueId(undefined, scopedRootPrefix);

  // Themes
  const themesList: (HvTheme | HvThemeStructure)[] = processThemes(themes);

  // Emotion cache
  // Moves UI Kit styles to the top of the <head> so they're loaded first
  // This enables users to override the UI Kit styles if necessary
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
        styles={cssReact`
          ${cssBaseline == "global" && CssBaseline}
          ${getThemesVars(themesList)}
        `}
      />
      <HvThemeProvider
        themes={themesList}
        theme={theme || themesList[0].name}
        colorMode={colorMode || Object.keys(themesList[0].colors.modes)[0]}
        themeRootId={
          cssTheme === "scoped" ? rootElementId || scopedRootId : undefined
        }
      >
        <ClassNames>
          {({ css }) => {
            if (cssBaseline === "scoped" && rootElementId) {
              const rootElement = document.getElementById(rootElementId);

              if (rootElement) {
                rootElement.classList.add(
                  css({
                    ...CssScopedBaseline,
                  })
                );
              }
            }

            return (cssTheme === "scoped" || cssBaseline === "scoped") &&
              !rootElementId ? (
              <div
                id={scopedRootId}
                className={
                  cssBaseline === "scoped"
                    ? css({ ...CssScopedBaseline })
                    : undefined
                }
              >
                {children}
              </div>
            ) : (
              children
            );
          }}
        </ClassNames>
      </HvThemeProvider>
    </CacheProvider>
  );
};
