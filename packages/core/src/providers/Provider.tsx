import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "./Context";

import { css, Global } from "@emotion/react";
import { CssBaseline } from "@hitachivantara/uikit-styles";
import { useTheme } from "../hooks";

interface ProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
  rootElementId?: string;
}

const InternalProvider = ({
  enableCssBaseline = true,
  children,
  rootElementId,
}: ProviderProps) => {
  const { themesVars, setThemeAttrs } = useTheme();

  const { theme: contextTheme, mode: contextMode } = useContext(ThemeContext);

  setThemeAttrs(contextTheme, contextMode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${themesVars}
      body {
            transition: background 0.5s ease-out;
          }
        `}
      />

      <div id={rootElementId}>{children}</div>
    </>
  );
};

const Provider = ({
  enableCssBaseline = true,
  children,
  rootElementId = "uikit-root",
}: ProviderProps) => {
  return (
    <>
      <ThemeContextProvider>
        <InternalProvider
          enableCssBaseline={enableCssBaseline}
          rootElementId={rootElementId}
        >
          {children}
        </InternalProvider>
      </ThemeContextProvider>
    </>
  );
};

export default Provider;

if (process.env.NODE_ENV !== "production") {
  Provider.displayName = "Provider";
}
