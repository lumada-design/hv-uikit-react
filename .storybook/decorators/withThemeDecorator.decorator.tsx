import { Global } from "@emotion/react";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { useChannel, useEffect, useGlobals } from "@storybook/preview-api";
import { Decorator } from "@storybook/react";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { themes } from "@hitachivantara/uikit-styles";

import { ADDON_EVENT as MODE_ADDON_EVENT } from "../addons/mode-selector/constants";
import { getStoryStyles } from "../theme/styles/story";
import {
  getInitialTheme,
  getThemesList,
  setLocalTheme,
  useDarkClass,
} from "./utils";

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } =
  DecoratorHelpers;

const themesList = getThemesList(themes);
const themesLabels = themesList.map((theme) => theme.label);

export const withThemeDecorator = (): Decorator => {
  const defaultTheme = getInitialTheme(themesList).label;
  initializeThemeState(themesLabels, defaultTheme);

  return (Story, context) => {
    const [, updateGlobals] = useGlobals();
    const selectedTheme = pluckThemeFromContext(context);
    const { themeOverride } = useThemeParameters();

    const selected = themeOverride || selectedTheme || defaultTheme;
    const [theme, mode] = selected.split(" ");

    const base = (themes as any)[theme] ?? themes.ds5;
    const storyStyles = getStoryStyles(
      base.colors.modes[mode as "wicked" | "dawn"].atmo2,
    );

    const containerRef = useDarkClass(mode);

    // Listen for theme changes and keep track in local storage
    useEffect(() => {
      if (context.globals.theme) setLocalTheme(context.globals.theme);
    }, [context.globals.theme]);

    // TODO - Review not working properly
    // Listen for changes on the mode selector addon to update the theme selector
    useChannel({
      [MODE_ADDON_EVENT]: (newMode: string) => {
        updateGlobals({ theme: `${theme} ${newMode}` });
      },
    });

    return (
      <>
        <Global styles={storyStyles} />
        <HvProvider
          classNameKey="hv-story"
          cssTheme="scoped"
          themes={Object.values(themes)}
          theme={theme}
          colorMode={mode}
        >
          <div
            ref={containerRef}
            className="hv-story-sample"
            style={{ padding: 20 }}
          >
            <Story />
          </div>
        </HvProvider>
      </>
    );
  };
};
