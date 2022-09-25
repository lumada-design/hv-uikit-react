import { Global } from "@emotion/react";
import { StoreProvider } from "store";
import { cssReset } from "theme";
import ThemeProvider from "./ThemeProvider";

interface ProviderProps {
  enableCssReset?: boolean;
}

const Provider: React.FC<ProviderProps> = ({
  enableCssReset = true,
  children,
}) => (
  <StoreProvider>
    {enableCssReset && <Global styles={cssReset} />}
    <ThemeProvider>{children}</ThemeProvider>
  </StoreProvider>
);

export default Provider;
