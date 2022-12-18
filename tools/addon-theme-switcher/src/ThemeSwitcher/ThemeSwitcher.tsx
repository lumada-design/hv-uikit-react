import { useEffect, useState } from "react";
import {
  WithTooltip,
  TooltipLinkList,
  Icons,
  IconButton,
} from "@storybook/components";
import { themes as hvThemes } from "@hitachivantara/uikit-styles";

import useThemeSwitcher from "./useThemeSwitcher";
import { getThemesModes, toPascalCase } from "./utils";
import { ADDON_ID } from "../constants";

interface ColorIconProps {
  color: string;
}

const ColorIcon = ({ color }: ColorIconProps) => (
  <span
    style={{
      borderRadius: "1rem",
      display: "block",
      height: "1rem",
      width: "1rem",
      background: color,
    }}
  />
);

const Switcher = () => {
  return (
    <IconButton key={ADDON_ID} active={false} title={"Select theme"}>
      <Icons icon="lightning" />
    </IconButton>
  );
};

export const ThemeSwitcher = () => {
  const [themesList, setThemesList] = useState<AddonTheme[]>([]);
  const { setTheme } = useThemeSwitcher();

  const modes = getThemesModes(hvThemes);

  useEffect(() => {
    const themes = modes.map((theme) => {
      const isDark = theme.includes("dark") || theme.includes("wicked");

      return {
        name: theme,
        label: toPascalCase(theme.replace(/theme-/i, " ")),
        value: isDark ? "dark" : "light",
        color: isDark ? "#414141" : "#F0F0F0",
      };
    });

    setThemesList(themes);
  }, []);

  return themesList?.length ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={
        <TooltipLinkList
          links={themesList?.map((theme: AddonTheme) => ({
            id: theme.name,
            title: theme.label,
            right: theme.color ? <ColorIcon color={theme.color} /> : undefined,
            onClick: () => setTheme(theme),
          }))}
        />
      }
    >
      <Switcher />
    </WithTooltip>
  ) : null;
};
