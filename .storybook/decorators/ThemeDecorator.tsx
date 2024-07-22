import { useEffect, useRef, useState } from "react";
import { useChannel } from "@storybook/preview-api";
import { Decorator } from "@storybook/react";
import { Global } from "@storybook/theming";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";
import { ds3, ds5, pentahoPlus } from "@hitachivantara/uikit-styles";

import { ADDON_EVENT } from "../addons/theme-selector/constants";
import { getLocalTheme } from "../addons/theme-selector/utils";
import { getStoryStyles } from "../theme/styles/story";

/** Return a `ref` that adds/removes `dark` class variant depending on `mode` */
const useDarkClass = <T extends HTMLElement = HTMLDivElement>(mode: string) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (mode === "wicked") {
      ref.current?.classList.add("dark");
    } else {
      ref.current?.classList.remove("dark");
    }
  }, [mode]);

  return ref;
};

export const ThemeDecorator: Decorator = (Story) => {
  const [selectedTheme, setSelectedTheme] = useState(getLocalTheme);

  const [theme, mode] = selectedTheme?.split("-") || ["ds5", "dawn"];
  const base = theme === "ds3" ? ds3 : ds5;

  const containerRef = useDarkClass(mode);

  const storyStyles = getStoryStyles(
    base.colors.modes[mode as "wicked" | "dawn"].atmo2,
  );

  const switchTheme = ({ name }: Theme) => {
    setSelectedTheme(name);
  };

  useChannel({
    [ADDON_EVENT]: switchTheme,
  });

  return (
    <>
      <Global styles={storyStyles} />
      <HvProvider
        classNameKey="hv-story"
        cssTheme="scoped"
        themes={[ds5, ds3, pentahoPlus]}
        theme={theme}
        colorMode={mode}
      >
        <HvVizProvider>
          <div
            ref={containerRef}
            className="hv-story-sample"
            style={{ padding: 20 }}
          >
            <Story />
          </div>
        </HvVizProvider>
      </HvProvider>
    </>
  );
};
