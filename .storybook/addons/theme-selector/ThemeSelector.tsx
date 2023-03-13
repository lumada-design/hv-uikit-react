import React, { useState, useEffect } from "react";
import { Global } from "@storybook/theming";
import {
  WithTooltip,
  TooltipLinkList,
  IconButton,
} from "@storybook/components";

import { theme, themes } from "../../../packages/styles/src";
import { getManagerStyles } from "../../theme/styles/manager";
import { getThemesList, getInitialTheme, setLocalTheme } from "./utils";
import { ADDON_ID } from "./constants";

const ThemeSelector = ({ api }) => {
  const managerStyles = getManagerStyles(theme);
  const themesList = getThemesList(themes);
  const initialTheme = getInitialTheme(themesList);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  useEffect(() => {
    setLocalTheme(selectedTheme.name);
    api.emit("THEME_SELECT", selectedTheme);
  }, [selectedTheme]);

  const links = themesList.map((theme) => ({
    id: theme.name,
    title: theme.label,
    active: theme.label === selectedTheme?.label,
    onClick: () => setSelectedTheme(theme),
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
