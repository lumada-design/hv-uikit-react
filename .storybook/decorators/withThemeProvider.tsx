import { useState, useEffect } from "react";
import { addons } from "@storybook/addons";
import { Global } from "@storybook/theming";
import { HvProvider, HvBaseTheme } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

import { getStoryStyles } from "../theme/styles/story";

const withThemeProvider = (story) => {
  const storyStyles = getStoryStyles(theme);
  const initialTheme = localStorage?.getItem("sb-uikit-theme");
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const switchTheme = ({ name }) => {
    setSelectedTheme(name);
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on("THEME_SELECT", switchTheme);

    return () => {
      channel.removeListener("THEME_SELECT", switchTheme);
    };
  });

  return (
    <>
      <Global styles={storyStyles} />
      <HvProvider
        theme={{
          baseTheme: selectedTheme?.split("-")[0] as HvBaseTheme,
          baseColorMode: selectedTheme?.split("-")[1],
        }}
      >
        {story()}
      </HvProvider>
    </>
  );
};

export default withThemeProvider;
