type ThemeMode = "light" | "dark";

interface Theme {
  title: string;
  value?: string;
  color?: string;
}
interface ThemeLink {
  id: string;
  title: string;
  right: JSX.Element | undefined;
}

interface ThemeSwitcher {
  theme: string;
  setTheme: (value: string) => void;
  setColorMode: () => void;
  isDarkMode: boolean;
  isToggleMode: boolean;
}
