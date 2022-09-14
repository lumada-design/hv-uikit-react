import { Icons, IconButton } from "@storybook/components";

import { ADDON_ID } from "config";
import useThemeSwitcher from "hooks/useThemeSwitcher";
import SunIcon from "components/icons/SunIcon";
import MoonIcon from "components/icons/MoonIcon";

const Switcher: React.FC = () => {
  const { isDarkMode, isToggleMode, setColorMode } = useThemeSwitcher();

  const ModeIcon = () => (isDarkMode ? <SunIcon /> : <MoonIcon />);

  return (
    <IconButton
      key={ADDON_ID}
      active={false}
      title={`${isToggleMode ? "Toggle" : "Select"} theme`}
      onClick={() => isToggleMode && setColorMode()}
    >
      {isToggleMode ? <ModeIcon /> : <Icons icon="lightning" />}
    </IconButton>
  );
};

export default Switcher;
