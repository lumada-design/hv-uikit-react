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

export const useTheme = () => {
  const {
    theme: contextTheme,
    mode: contextMode,
    setTheme: setSelThemeCtx,
    setMode: setSelModeCtx,
  } = useContext(ThemeContext);

  const [colorModes, setColorModes] = useState(theme.colorModes);

  const setThemeAttrs = (
    dataTheme = contextTheme,
    dataColorMode = contextMode
  ) => {
    console.log("SETTING ATTRS WITH ", dataTheme, dataColorMode);
    document.body.setAttribute(`data-theme`, dataTheme);
    document.body.setAttribute(`data-color-mode`, dataColorMode);
  };

  useEffect(() => {
    theme = parseTheme(themes, contextTheme, contextMode);

    setColorModes(theme.colorModes);

    setSelThemeCtx(contextTheme);
    setSelModeCtx(theme.selectedMode);

    setThemeAttrs(contextTheme, theme.selectedMode);
  }, [contextTheme]);

  useEffect(() => {
    setSelModeCtx(contextMode);
    setThemeAttrs(contextTheme, contextMode);
  }, [contextMode]);

  const onChangeTheme = (nextTheme: string) => {
    setSelThemeCtx(nextTheme);
  };

  const onChangeColorMode = (nextColorMode: string) => {
    setSelModeCtx(nextColorMode);
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
