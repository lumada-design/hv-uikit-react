import { useTracked } from "store";

export const useTheme = () => {
  const [state, setState] = useTracked();

  return {
    themes: state.themes,
    theme: state.theme,
    colorModes: state.colorModes,
    colorMode: state.colorMode,
    setThemes: (themes: string[]) => setState({ ...state, themes }),
    setTheme: (theme: string) => setState({ ...state, theme }),
    setColorModes: (colorModes: string[]) => setState({ ...state, colorModes }),
    setColorMode: (colorMode: string) => setState({ ...state, colorMode }),
  };
};
