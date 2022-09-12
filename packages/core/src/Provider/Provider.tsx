import {
  createContext,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import { themes, toVars } from "theme";

export const Context = createContext<ContextValue>({
  theme: "light",
  toggleTheme: () => undefined,
});

const Provider: React.FC = ({ children }) => {
  const root = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const vars = toVars(themes[theme]);
    for (const [key, value] of Object.entries(vars)) {
      root.current?.style.setProperty(key, value as Theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <Context.Provider value={value}>
      <div ref={root}>{children}</div>
    </Context.Provider>
  );
};

export default Provider;
