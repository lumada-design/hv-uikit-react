import React from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";

import { HvProvider, theme } from "../../packages/core/src";
import { getDocsStyles } from "../theme/styles/docs";

export default ({ context, children }) => {
  const docsStyles = getDocsStyles(theme);

  return (
    <>
      <Global styles={docsStyles} />
      <HvProvider>
        <DocsContainer context={context}>{children}</DocsContainer>
      </HvProvider>
    </>
  );
};
