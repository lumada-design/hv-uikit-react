import { css, Global } from "@emotion/react";
import {
  CssBaseline,
  getThemesVars,
  themes,
} from "@hitachivantara/uikit-styles";

import ThemeProvider from "../providers/ThemeProvider";
import { setElementAttrs } from "../utils/themeUtils";

interface ProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
  rootElementId?: string;
  theme?: string;
  colorMode?: string;
}

const Provider = ({
  children,
  enableCssBaseline = true,
  rootElementId,
  theme,
  colorMode,
}: ProviderProps) => {
  setElementAttrs(rootElementId, theme, colorMode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getThemesVars(themes)}
        `}
      />
      <ThemeProvider rootElementId={rootElementId}>{children}</ThemeProvider>
    </>
  );
};

export default Provider;

if (process.env.NODE_ENV !== "production") {
  Provider.displayName = "Provider";
}
