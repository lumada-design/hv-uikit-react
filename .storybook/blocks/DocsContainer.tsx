import React, { useMemo, useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";
import { addons } from "@storybook/addons";

import { HvProvider } from "@hitachivantara/uikit-react-core";

import { getDocsStyles } from "../theme/styles/docs";
import { getInitialMode, Mode } from "../addons/mode-selector/utils";
import { ADDON_EVENT } from "../addons/mode-selector/constants";

export default ({ context, children }) => {
  const initialMode = getInitialMode();
  const [isDark, setIsDark] = useState(initialMode === "wicked");

  const switchMode = (mode: Mode) => {
    setIsDark(mode === "wicked");
  };

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on(ADDON_EVENT, switchMode);

    return () => {
      channel.off(ADDON_EVENT, switchMode);
    };
  }, []);

  const docsContext = {
    ...context,
    parameters: {
      ...context.parameters,
      docs: { ...context.parameters.docs },
    },
  };

  const docsStyles = useMemo(() => getDocsStyles(isDark), [isDark]);

  return (
    <>
      <Global styles={docsStyles} />
      <HvProvider
        classNameKey="hv-storybook"
        cssTheme="scoped"
        colorMode={isDark ? "wicked" : "dawn"}
      >
        <DocsContainer context={docsContext}>{children}</DocsContainer>
      </HvProvider>
    </>
  );
};
