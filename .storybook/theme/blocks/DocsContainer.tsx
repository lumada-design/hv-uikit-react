import React from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";

import { themes } from "../../../packages/styles/src";
import { getDocsStyles } from "../styles/docs";

export default ({ context, children }) => {
  const docsStyles = getDocsStyles(themes.ds5);

  const docsContext = {
    ...context,
    parameters: { ...context.parameters, docs: { ...context.parameters.docs } },
  };

  return (
    <>
      <Global styles={docsStyles} />
      <DocsContainer context={docsContext}>{children}</DocsContainer>
    </>
  );
};
