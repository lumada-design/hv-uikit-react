import { HvProvider } from "@hitachivantara/uikit-core";
import { addons } from "@storybook/addons";
import { useEffect, useState } from "react";

export const withThemeSwitcher = (Story) => {
  const [theme, setTheme] = useState();
  const selected = theme?.name.split("-");

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on("THEME_SWITCH", setTheme);

    return () => {
      channel.removeListener("THEME_SWITCH", setTheme);
    };
  });

  return (
    <HvProvider theme={selected?.[0]} colorMode={selected?.[1]}>
      <Story />
    </HvProvider>
  );
};
