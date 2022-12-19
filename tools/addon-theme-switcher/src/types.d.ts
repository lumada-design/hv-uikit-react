type ThemeMode = "light" | "dark";

interface AddonTheme {
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
  setTheme: (theme: AddonTheme) => void;
  isDarkMode: boolean;
}
