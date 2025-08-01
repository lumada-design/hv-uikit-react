import { HvAppShellEventTheme } from "@hitachivantara/app-shell-events";
import { useTheme } from "@hitachivantara/uikit-react-core";

import useLocalStorage from "./useLocalStorage";

const useThemeEventListener = () => {
  const { selectedMode, colorModes } = useTheme();
  const { setStoredValue } = useLocalStorage("COLOR_MODE");

  const getNextColorMode = () => {
    const index = colorModes.indexOf(selectedMode);

    const nextIndex = (index + 1) % colorModes.length;
    return colorModes[nextIndex];
  };

  const handleThemeEvent = (event: CustomEvent<HvAppShellEventTheme>) => {
    const { colorMode } = event.detail;
    const newColorMode =
      !colorMode || colorModes.indexOf(colorMode) === -1
        ? getNextColorMode()
        : colorMode;

    // For now we only want to change the colorMode
    changeTheme(undefined, newColorMode);
    setStoredValue(newColorMode);
  };

  return { handleThemeEvent };
};

export default useThemeEventListener;
