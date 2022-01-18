import React, { useMemo, useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import addons from "@storybook/addons";
import { Global } from "@storybook/theming";
import { getTheme, UIKIT_THEME } from "../theme";
import { getDocsStyles } from "../theme/styles/docs";

import { HvProvider } from "@hv/uikit-react-core";

export default ({ context, children }) => {
  const theme = getTheme();

  const channel = addons.getChannel();
  const [themeName, setThemeName] = useState(theme.hv.name);

  useEffect(() => {
    channel.on(UIKIT_THEME, setThemeName);
    return () => channel.off(UIKIT_THEME, setThemeName);
  }, [channel, setThemeName]);

  const docsContext = {
    ...context,
    parameters: { ...context.parameters, docs: { ...context.parameters.docs, theme } },
  };

  const docsStyles = useMemo(() => getDocsStyles(theme), [theme]);

  return (
    <>
      <Global styles={docsStyles} />
      <DocsContainer context={docsContext}>
        <HvProvider uiKitTheme={themeName} generateClassNameOptions={{ seed: "sb-docs-container" }}>
          {children}
        </HvProvider>
      </DocsContainer>
    </>
  );
};
