interface ContextValue {
  theme?: string;
  setTheme: (theme: string) => void;
  colorMode?: string;
  setColorMode?: (mode: string) => void;
  themes?: string[];
  colorModes?: string[];
}
