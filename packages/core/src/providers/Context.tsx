/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useMemo, useState } from "react";

const initialState = {
  theme: "ds3Theme",
  setTheme: (theme: string) => {},
  mode: "dawn",
  setMode: (mode: string) => {},
};
const ThemeContext = createContext(initialState);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("ds3Theme");
  const [mode, setMode] = useState("dawn");

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      mode,
      setMode,
    }),
    [theme, setTheme, mode, setMode]
  );

  return (
    // @ts-ignore
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
