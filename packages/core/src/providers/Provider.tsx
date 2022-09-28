import React from "react";
import { Global, css } from "@emotion/react";
import { hvThemes, themeVars, cssReset } from "theme";
import { parseThemes, getStylesFromThemes } from "theme/utils";

interface ProviderProps {
  enableCssReset?: boolean;
}

const Provider: React.FC<ProviderProps> = ({
  enableCssReset = true,
  children,
}) => {
  const themes = parseThemes(hvThemes);

  document.body.setAttribute(`data-theme`, themes.selected);
  document.body.setAttribute(`data-color-mode`, themes.selectedColorMode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssReset && cssReset}
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
