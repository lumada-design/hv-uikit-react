import { useContext } from "react";
import { ThemeContext } from "providers";

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};

export default useTheme;
