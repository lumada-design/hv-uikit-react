import { HvProvider, HvThemeContext } from "@hitachivantara/uikit-core";
import { addons } from "@storybook/addons";
import { useEffect, useContext } from "react";

export const withThemeSwitcher = (Story) => {
  const { changeTheme } = useContext(HvThemeContext);

  useEffect(() => {
    const channel = addons.getChannel();

    const switchTheme = (concatTheme) => {
      const selected = concatTheme?.name.split("-");

      changeTheme(selected?.[0], selected?.[1]);
    };

    channel.on("THEME_SWITCH", switchTheme);

    return () => {
      channel.removeListener("THEME_SWITCH", switchTheme);
    };
  });

  return (
    <HvProvider>
      <Story />
    </HvProvider>
  );
};
