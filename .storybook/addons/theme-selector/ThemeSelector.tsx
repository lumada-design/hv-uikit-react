import React, { useState, useEffect } from "react";
import { Global } from "@storybook/theming";
import {
  WithTooltip,
  TooltipLinkList,
  IconButton,
} from "@storybook/components";
import { addons } from "@storybook/addons";

import { themes } from "../../../packages/styles/src";
import { getManagerStyles } from "../../theme/styles/manager";
import {
  getThemesList,
  getInitialTheme,
  setLocalTheme,
  getLocalTheme,
} from "./utils";
import { ADDON_EVENT, ADDON_ID } from "./constants";

const ThemeSelector = ({ api }) => {
  const managerStyles = getManagerStyles();
  const themesList = getThemesList(themes);
  const initialTheme = getInitialTheme(themesList);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const switchMode = (mode: string) => {
    const currentTheme = getLocalTheme();

    const newTheme = themesList.find(
      (el) => el.name === `${currentTheme?.split("-")[0]}-${mode}`
    );

    if (newTheme) {
      switchTheme(newTheme);
    }
  };

  // listen for changes on the mode selector addon
  // to update the theme selector
  useEffect(() => {
    const channel = addons.getChannel();
    channel.on("MODE_SELECT", switchMode);

    return () => {
      channel.off("MODE_SELECT", switchMode);
    };
  }, []);

  const switchTheme = (theme: Theme) => {
    setLocalTheme(theme.name);
    setSelectedTheme(theme);

    api.emit(ADDON_EVENT, theme);
  };

  const links = themesList.map((theme) => ({
    id: theme.name,
    title: theme.label,
    active: theme.label === selectedTheme?.label,
    onClick: () => switchTheme(theme),
  }));

  return (
    <>
      <Global styles={managerStyles} />
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={<TooltipLinkList links={links} />}
      >
        <IconButton key={ADDON_ID} active={false} title={"Select theme"}>
          {`Theme: ${selectedTheme?.label}`}
        </IconButton>
      </WithTooltip>
    </>
  );
};

export default ThemeSelector;
