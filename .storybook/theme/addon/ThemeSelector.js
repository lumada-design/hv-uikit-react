import React, { useState, useEffect, useMemo } from "react";
import { FORCE_RE_RENDER } from "@storybook/core-events";
import { Global } from "@storybook/theming";
import { IconButton } from "@storybook/components";

import ThemeSwitcherIcon from "../../../packages/icons/bin/ThemeSwitcher";
import { UIKIT_THEME, getTheme, storeTheme } from "../";
import { getManagerStyles } from "../styles/manager";

const ThemeSelector = ({ api }) => {
  const theme = getTheme();
  const [themeName, setThemeName] = useState(theme.hv.name);

  function setMode(newTheme) {
    setThemeName(() => {
      storeTheme(newTheme);

      const channel = api.getChannel();
      channel.emit(UIKIT_THEME, newTheme);
      channel.emit(FORCE_RE_RENDER);

      return newTheme;
    });
  }

  useEffect(() => {
    api.setOptions({ theme });
  }, [theme]);

  const managerStyles = useMemo(() => getManagerStyles(theme), [theme]);

  return (
    <>
      <Global styles={managerStyles} />
      <IconButton
        key="theme-switcher"
        title={themeName === "wicked" ? "Change theme to Dawn" : "Change theme to Wicked"}
        onClick={() => setMode(themeName === "wicked" ? "dawn" : "wicked")}
      >
        <ThemeSwitcherIcon style={{ width: 16, height: 16 }} color={theme.colorSecondary} />
      </IconButton>
    </>
  );
};

export default ThemeSelector;
