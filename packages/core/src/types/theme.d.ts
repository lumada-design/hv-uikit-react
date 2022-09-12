type Theme = "light" | "dark";

interface ContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
