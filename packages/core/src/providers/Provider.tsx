import { createContext } from "react";
import { Global } from "@emotion/react";

import ThemeProvider from "./ThemeProvider";
import { cssReset } from "theme";

interface ProviderProps {
  enableCssReset: boolean;
}
export const Context = createContext<ProviderContextValue>({});

const Provider: React.FC<ProviderProps> = ({
  enableCssReset = true,
  children,
}) => {
  return (
    <Context.Provider value={{}}>
      {enableCssReset && <Global styles={cssReset} />}
      <ThemeProvider>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export default Provider;
