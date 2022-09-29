import { Global, css } from "@emotion/react";
import { hvThemes, themeVars, CssBaseline } from "theme";
import { parseThemes, getStylesFromThemes } from "theme/utils";

interface ProviderProps {
  enableCssBaseline?: boolean;
}

const Provider: React.FC<ProviderProps> = ({
  enableCssBaseline = true,
  children,
}) => {
  const themes = parseThemes(hvThemes);

  document.body.setAttribute(`data-theme`, themes.selected);
  document.body.setAttribute(`data-color-mode`, themes.selectedColorMode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getStylesFromThemes(hvThemes)}
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
