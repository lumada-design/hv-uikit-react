import { Global, css } from "@emotion/react";
import { themes, themeVars, CssBaseline } from "..";
import { getThemesCSSVars } from "../utils";

interface ThemeProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
}

const ThemeProvider = ({
  enableCssBaseline = true,
  children,
}: ThemeProviderProps) => {
  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getThemesCSSVars(themes)}
          body {
            background: ${themeVars.colors.atmo2};
            transition: background 0.5s ease-out;
          }
        `}
      />
      {children}
    </>
  );
};

export default ThemeProvider;

if (process.env.NODE_ENV !== "production") {
  ThemeProvider.displayName = "ThemeProvider";
}
