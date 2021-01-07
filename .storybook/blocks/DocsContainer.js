import React from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { Global } from "@storybook/theming";
import { getTheme, getStoredTheme } from "../theme";
import { getDocsStyles } from "../theme/styles/docs";

import HvProvider from "@hv/uikit-react-core/dist/Provider";

export default ({ context, children }) => {
  const themeName = getStoredTheme();
  const theme = getTheme();

  const docsContext = {
    ...context,
    parameters: { ...context.parameters, docs: { ...context.parameters.docs, theme } },
  };

  return (
    <>
      <Global styles={getDocsStyles(theme)} />
      <DocsContainer context={docsContext}>
        <HvProvider uiKitTheme={themeName}>{children}</HvProvider>
      </DocsContainer>
    </>
  );
};
