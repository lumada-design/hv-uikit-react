import React, { useState, useEffect } from "react";

import { FORCE_RE_RENDER } from "@storybook/core-events";
import { Global } from "@storybook/theming";

import { IconButton } from "@storybook/components";
import ThemeSwitcherIcon from "../../packages/icons/bin/ThemeSwitcher";

import {
  UIKIT_THEME,
  getStorybookTheme,
  getStoredTheme,
  setStoredTheme,
  getManagerStylesOverrides
} from "./index";

const ThemeSelector = ({ api }) => {
  const [theme, setTheme] = useState(getStoredTheme());

  function setMode(newTheme) {
    setTheme(() => {
      setStoredTheme(newTheme);

      const channel = api.getChannel();
      channel.emit(UIKIT_THEME, newTheme);
      channel.emit(FORCE_RE_RENDER);

      return newTheme;
    });
  }

  const sbTheme = getStorybookTheme(theme);

  useEffect(() => {
    api.setOptions({ theme: sbTheme });
  }, [sbTheme]);

  return (
    <>
      <Global styles={getManagerStylesOverrides(sbTheme)} />
      <IconButton
        key="theme-switcher"
        title={theme === "wicked" ? "Change theme to Dawn" : "Change theme to Wicked"}
        onClick={() => setMode(theme === "wicked" ? "dawn" : "wicked")}
      >
        <ThemeSwitcherIcon style={{ width: 16, height: 16 }} color={sbTheme.colorSecondary} />
      </IconButton>
    </>
  );
};

export default ThemeSelector;
