interface ProviderProps {
  enableCssReset: boolean;
}

interface ProviderContextValue {
  themes?: string[];
  theme?: string;
  setTheme: (theme: string) => void;
  colorModes?: string[];
  colorMode?: string;
  setColorMode?: (mode: string) => void;
}
