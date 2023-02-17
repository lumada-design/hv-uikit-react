import { useEffect, useState } from "react";
import { addons } from "@storybook/addons";
import { HvProvider } from "@hitachivantara/uikit-react-core";

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
    <HvProvider
      theme={{
        baseTheme: selected?.[0] || "ds5",
        baseColorMode: selected?.[1] || "dawn",
      }}
    >
      <Story />
    </HvProvider>
  );
};
