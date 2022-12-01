import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "./Context";

import { css, Global } from "@emotion/react";
import { CssBaseline, theme } from "@hitachivantara/uikit-styles";
import { useTheme } from "../hooks";

interface ProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
}

const InternalProvider = ({
  enableCssBaseline = true,
  children,
}: ProviderProps) => {
  const { themesVars, setThemeAttrs } = useTheme();

  const { theme: cTheme, mode } = useContext(ThemeContext);
  console.log("Provider: ", cTheme, mode);

  setThemeAttrs(cTheme, mode);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${themesVars}
      body {
            background: ${theme.colors.atmo2};
            transition: background 0.5s ease-out;
          }
        `}
      />

      {children}
    </>
  );
};

const Provider = ({ enableCssBaseline = true, children }: ProviderProps) => {
  return (
    <>
      <ThemeContextProvider>
        <InternalProvider enableCssBaseline={enableCssBaseline}>
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
