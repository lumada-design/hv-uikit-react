import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface DocsTheme {
  theme: string;
  mode: string;
}

interface DocsThemeContextValue {
  docsTheme: DocsTheme;
  setDocsTheme?: Dispatch<SetStateAction<DocsTheme>>;
}

const DEFAULT_THEME = {
  theme: "pentahoPlus",
  mode: "dawn",
};

const DocsThemeContext = createContext<DocsThemeContextValue>({
  docsTheme: DEFAULT_THEME,
});

interface DocsThemeProviderProps {
  children?: React.ReactNode;
}

export const DocsThemeProvider = ({ children }: DocsThemeProviderProps) => {
  const [docsTheme, setDocsTheme] = useState<DocsTheme>(DEFAULT_THEME);

  const value = useMemo(
    () => ({
      docsTheme,
      setDocsTheme,
    }),
    [docsTheme],
  );

  return (
    <DocsThemeContext.Provider value={value}>
      {children}
    </DocsThemeContext.Provider>
  );
};

export const useDocsThemeContext = () => useContext(DocsThemeContext);
