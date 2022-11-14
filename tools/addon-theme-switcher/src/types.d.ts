type ThemeMode = "light" | "dark";

interface Theme {
  name: string;
  label: string;
  value: string;
  color: string;
}

interface ThemeLink {
  id: string;
  title: string;
  right: JSX.Element | undefined;
}

interface ThemeSwitcher {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  isToggleMode: boolean;
}
