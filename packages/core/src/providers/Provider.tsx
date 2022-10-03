import { Global, css } from "@emotion/react";
import { themes, themeVars, CssBaseline } from "theme";
import { parseThemes, getStylesFromThemes } from "theme/utils";

interface ProviderProps {
  enableCssBaseline?: boolean;
}

const Provider: React.FC<ProviderProps> = ({
  enableCssBaseline = true,
  children,
}) => {
  const tParsed = parseThemes(themes);

  document.body.setAttribute(`data-theme`, tParsed.selected);
  document.body.setAttribute(`data-color-mode`, tParsed.selectedColorMode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getStylesFromThemes(themes)}
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
