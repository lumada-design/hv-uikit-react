import {
  getThemesModes,
  getThemesVars,
  parseTheme,
  themes,
} from "@hitachivantara/uikit-styles";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/Context";

const themesVars = getThemesVars(themes);
const themesModes = getThemesModes(themes);

let theme = parseTheme(themes);

export const useTheme = (rootElementId = "uikit-root") => {
  const {
    theme: contextTheme,
    mode: contextMode,
    setTheme: setContextTheme,
    setMode: setContextMode,
  } = useContext(ThemeContext);

  const [colorModes, setColorModes] = useState(theme.colorModes);

  const setThemeAttrs = (
    dataTheme = contextTheme,
    dataColorMode = contextMode
  ) => {
    document
      .getElementById(rootElementId)
      ?.setAttribute(`data-theme`, dataTheme);
    document
      .getElementById(rootElementId)
      ?.setAttribute(`data-color-mode`, dataColorMode);

    // We need the body to have the background color based on the theme
    document.body.style.backgroundColor =
      themes[contextTheme]?.colors.modes[contextMode]?.atmo2;

    console.log(contextMode);
  };

  useEffect(() => {
    theme = parseTheme(themes, contextTheme, contextMode);

    setColorModes(theme.colorModes);

    setContextTheme(contextTheme);
    setContextMode(theme.selectedMode);

    setThemeAttrs(contextTheme, contextMode);
  }, [contextTheme]);

  useEffect(() => {
    setContextMode(contextMode);
    setThemeAttrs(contextTheme, contextMode);
  }, [contextMode]);

  const onChangeTheme = (nextTheme: string) => {
    setContextTheme(nextTheme);
  };

  const onChangeColorMode = (nextColorMode: string) => {
    setContextMode(nextColorMode);
  };

  return {
    themesVars,
    themesModes,
    selectedTheme: contextTheme,
    selectedMode: contextMode,
    colorModes,
    onChangeTheme,
    onChangeColorMode,
    setThemeAttrs,
  };
};
