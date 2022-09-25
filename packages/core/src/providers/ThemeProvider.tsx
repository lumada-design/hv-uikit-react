import { useEffect, useRef } from "react";
import { useTracked } from "store";
import { hvThemes } from "theme";
import { parseTheme, toCSSVars, setCSSVars } from "theme/utils";

const ThemeProvider: React.FC = ({ children }) => {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useTracked();

  useEffect(() => {
    const { colorModesList, selectedColorMode } = parseTheme(
      hvThemes,
      state.theme,
      state.colorMode
    );

    setState({
      ...state,
      colorModes: colorModesList,
      colorMode: selectedColorMode,
    });
  }, [state.theme]);

  useEffect(() => {
    const theme = hvThemes[state.theme];

    const vars = toCSSVars({
      ...theme,
      colors: {
        ...theme.colors.modes[state.colorMode],
      },
    });

    setCSSVars(root.current, vars);
  }, [state.colorMode]);

  return <div ref={root}>{children}</div>;
};

export default ThemeProvider;
