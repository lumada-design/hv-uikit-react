import React from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";
import { useDarkMode } from "storybook-dark-mode";

import { theme } from "@hitachivantara/uikit-styles";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { getDocsStyles } from "../theme/styles/docs";

export default ({ context, children }) => {
  const dark = useDarkMode();

  const docsStyles = getDocsStyles(theme);

  const docsContext = {
    ...context,
    parameters: { ...context.parameters, docs: { ...context.parameters.docs } },
  };

  return (
    <>
      <Global styles={docsStyles} />
      <HvProvider
        classNameKey="hv-storybook"
        cssTheme="scoped"
        colorMode={dark ? "wicked" : "light"}
      >
        <DocsContainer context={docsContext}>{children}</DocsContainer>
      </HvProvider>
    </>
  );
};
