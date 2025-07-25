import { HvAppShellEventTheme } from "@hitachivantara/app-shell-events";
import { useTheme } from "@hitachivantara/uikit-react-core";

import useLocalStorage from "./useLocalStorage";

const useThemeEventListener = () => {
  const { changeMode } = useTheme();
  const { setStoredValue } = useLocalStorage("COLOR_MODE");

  const handleThemeEvent = (event: CustomEvent<HvAppShellEventTheme>) => {
    const { colorMode } = event.detail;
    const newColorMode = colorMode === "dark" ? "dark" : "light";

    // For now we only want to change the colorMode
    changeMode(newColorMode);
    setStoredValue(newColorMode);
  };

  return { handleThemeEvent };
};

export default useThemeEventListener;
