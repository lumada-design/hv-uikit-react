interface ThemeFn {
  spacing: (factor: number) => number;
}
interface ThemeContextValue {
  themes?: string[];
  theme?: string;
  setTheme?: (theme: string) => void;
  colorModes?: string[];
  colorMode?: string;
  setColorMode?: (mode: string) => void;
}
