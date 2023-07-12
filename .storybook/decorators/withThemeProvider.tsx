import { useState, useEffect } from "react";

import { addons } from "@storybook/addons";
import { Global } from "@storybook/theming";

import { HvProvider } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";
import { ds3, ds5 } from "@hitachivantara/uikit-styles";

import { getStoryStyles } from "../theme/styles/story";
import { ADDON_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";

const withThemeProvider = (story) => {
  const initialTheme = getLocalTheme();

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const theme = selectedTheme?.split("-")[0] || "ds5";
  const mode = selectedTheme?.split("-")[1] || "dawn";
  const base = theme === "ds3" ? ds3 : ds5;

  const storyStyles = getStoryStyles(base.colors.modes[mode].atmo2);

  const switchTheme = ({ name }: Theme) => {
    setSelectedTheme(name);
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on(ADDON_EVENT, switchTheme);

    return () => {
      channel.off(ADDON_EVENT, switchTheme);
    };
  }, []);

  return (
    <>
      <Global styles={storyStyles} />
      <HvProvider
        classNameKey="hv-story"
        cssTheme="scoped"
        themes={[ds5, ds3]}
        theme={theme}
        colorMode={mode}
      >
        <HvVizProvider>
          <div style={{ padding: 20 }}>{story()}</div>
        </HvVizProvider>
      </HvProvider>
    </>
  );
};

export default withThemeProvider;
