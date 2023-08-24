import React, { useMemo, useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";
import { addons } from "@storybook/addons";

import { HvProvider } from "@hitachivantara/uikit-react-core";

import { getDocsStyles } from "../theme/styles/docs";
import { getInitialMode, Mode } from "../addons/mode-selector/utils";
import { ADDON_EVENT } from "../addons/mode-selector/constants";
import { themes } from ".storybook/theme";

export default ({ context, children }) => {
  const initialMode = getInitialMode();
  const [mode, setMode] = useState(initialMode);

  const switchMode = (mode: Mode) => {
    setMode(mode);
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on(ADDON_EVENT, switchMode);

    return () => {
      channel.off(ADDON_EVENT, switchMode);
    };
  }, []);

  const docsStyles = useMemo(() => getDocsStyles(mode === "wicked"), [mode]);

  return (
    <>
      <Global styles={docsStyles} />
      <HvProvider
        classNameKey="hv-storybook"
        cssTheme="scoped"
        colorMode={mode}
      >
        <DocsContainer theme={themes[mode]} context={context}>
          {children}
        </DocsContainer>
      </HvProvider>
    </>
  );
};
