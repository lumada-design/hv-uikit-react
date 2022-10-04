import { Global, css } from "@emotion/react";
import { themes, themeVars, CssBaseline } from "theme";
import { parseThemes, getThemesCSSVars } from "theme/utils";

interface ProviderProps {
  enableCssBaseline?: boolean;
}

const Provider: React.FC<ProviderProps> = ({
  enableCssBaseline = true,
  children,
}) => {
  const theme = parseThemes(themes);

  document.body.setAttribute(`data-theme`, theme.selected);
  document.body.setAttribute(`data-color-mode`, theme.selectedColorMode);

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

export default Provider;

if (process.env.NODE_ENV !== "production") {
  Provider.displayName = "Provider";
}
