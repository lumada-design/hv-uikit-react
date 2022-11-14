import { useState, useEffect } from "react";
import { addons } from "@storybook/addons";
import { HvProvider } from "@hitachivantara/uikit-core";

export const withThemeSwitcher = (Story) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on("THEME_SWITCH", setTheme);

    return () => {
      channel.removeListener("THEME_SWITCH", setTheme);
    };
  });

  return (
    <HvProvider>
      <Story />
    </HvProvider>
  );
};
