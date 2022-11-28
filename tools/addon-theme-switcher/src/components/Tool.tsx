import { useEffect, useState } from "react";
import { WithTooltip, TooltipLinkList } from "@storybook/components";
import { useTheme } from "@hitachivantara/uikit-core";

import useThemeSwitcher from "../hooks/useThemeSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ColorIcon from "../icons/ColorIcon";

const toPascalCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const Tool = () => {
  const [themesList, setThemesList] = useState<AddonTheme[]>([]);
  const { themesModes } = useTheme();
  const { setTheme } = useThemeSwitcher();

  useEffect(() => {
    const themes = themesModes.map((theme) => {
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
      <ThemeSwitcher />
    </WithTooltip>
  ) : (
    <ThemeSwitcher />
  );
};

export default Tool;
