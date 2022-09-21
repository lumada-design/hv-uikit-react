interface ThemeContextValue {
  themes?: string[];
  theme?: string;
  setTheme?: (theme: string) => void;
  colorModes?: string[];
  colorMode?: string;
  setColorMode?: (mode: string) => void;
  themeFn: {
    spacing: (factor: number) => number;
  };
}
