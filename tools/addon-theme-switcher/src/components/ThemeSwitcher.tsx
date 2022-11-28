import { Icons, IconButton } from "@storybook/components";

import useThemeSwitcher from "../hooks/useThemeSwitcher";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

import { ADDON_ID } from "../constants";

const ThemeSwitcher = () => {
  const { isDarkMode, isToggleMode, toggleTheme } = useThemeSwitcher();

  const ModeIcon = () => (isDarkMode ? <SunIcon /> : <MoonIcon />);

  return (
    <IconButton
      key={ADDON_ID}
      active={false}
      title={`${isToggleMode ? "Toggle" : "Select"} theme`}
      onClick={() => isToggleMode && toggleTheme()}
    >
      {isToggleMode ? <ModeIcon /> : <Icons icon="lightning" />}
    </IconButton>
  );
};

export default ThemeSwitcher;
