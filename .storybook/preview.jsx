import { useState, useEffect } from "react";
import { addons } from "@storybook/addons";
import { HvProvider } from "@hitachivantara/uikit-react-core";

const withThemeSwitcher = (Story, context) => {
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

export const decorators = [withThemeSwitcher];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: [
    { title: "Light", value: "light", color: "#F0F0F0" },
    { title: "Dark", color: "#414141" },
  ],
  options: {
    storySort: {
      order: [
        "Theme",
        "Layout",
        "Display",
        "Feedback",
        "Inputs",
        "Navigation",
        "Overlay",
        "Structure",
        "Visualizations",
        "Widgets",
        "Templates",
        "Lab",
        "Compat",
      ],
    },
  },
};
