import React from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { Global } from "@storybook/theming";
import { getTheme } from "../theme";
import { getDocsStyles } from "../theme/styles/docs";

export default ({ context, children }) => {
  const theme = getTheme();

  const docsContext = {
    ...context,
    parameters: { ...context.parameters, docs: { ...context.parameters.docs, theme } },
  };

  return (
    <>
      <Global styles={getDocsStyles(theme)} />
      <DocsContainer context={docsContext}>{children}</DocsContainer>
    </>
  );
};
