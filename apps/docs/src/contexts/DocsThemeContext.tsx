import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "next-themes";

interface DocsThemeContextValue {
  docsTheme: string;
  docsMode: string;
  setDocsTheme?: Dispatch<SetStateAction<string>>;
  setDocsMode?: Dispatch<SetStateAction<string>>;
}

const DEFAULT_THEME = {
  theme: "pentahoPlus",
  mode: "dawn",
};

const DocsThemeContext = createContext<DocsThemeContextValue>({
  docsTheme: DEFAULT_THEME.theme,
  docsMode: DEFAULT_THEME.mode,
});

interface DocsThemeProviderProps {
  children?: React.ReactNode;
}

export const DocsThemeProvider = ({ children }: DocsThemeProviderProps) => {
  const [docsTheme, setDocsTheme] = useState<string>("");
  const [docsMode, setDocsMode] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setDocsTheme(
      localStorage.getItem("uikit-docs-theme") ?? DEFAULT_THEME.theme,
    );
    setDocsMode(localStorage.getItem("uikit-docs-mode") ?? DEFAULT_THEME.mode);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      localStorage.setItem("uikit-docs-mode", resolvedTheme);
      setDocsMode(resolvedTheme === "dark" ? "wicked" : "dawn");
    }
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      docsTheme,
      docsMode,
      setDocsTheme,
      setDocsMode,
    }),
    [docsTheme, docsMode],
  );

  return (
    <DocsThemeContext.Provider value={value}>
      {children}
    </DocsThemeContext.Provider>
  );
};

export const useDocsThemeContext = () => useContext(DocsThemeContext);
