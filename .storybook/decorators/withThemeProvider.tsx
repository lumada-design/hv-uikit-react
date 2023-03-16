import { useState, useEffect } from "react";
import { addons } from "@storybook/addons";
import { Global } from "@storybook/theming";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { ds3, ds5, theme } from "@hitachivantara/uikit-styles";
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
        themes={[ds5, ds3]}
        theme={selectedTheme?.split("-")[0]}
        colorMode={selectedTheme?.split("-")[1]}
      >
        <div style={{ padding: 20 }}>{story()}</div>
      </HvProvider>
    </>
  );
};

export default withThemeProvider;
