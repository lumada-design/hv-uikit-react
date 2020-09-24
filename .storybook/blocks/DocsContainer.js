// Copied from https://github.com/storybookjs/storybook/blob/v5.3.18/addons/docs/src/blocks/DocsContainer.tsx
// to update storybook theme at runtime and apply stylesheet overrides

import * as React from "react";

import { DocsContainer } from "@storybook/addon-docs/blocks";
import { Global } from "@storybook/theming";

import { getStoredTheme, getStorybookTheme, getDocsStylesOverrides } from "../themes";

export default ({ context, children }) => {
  const theme = getStorybookTheme(getStoredTheme());

  const docsContext = { ...context };
  docsContext.parameters = { ...context.parameters };
  docsContext.parameters.options = {
    ...context.parameters.options,
    theme: theme
  };

  return (
    <>
      <Global styles={getDocsStylesOverrides(theme)} />
      <DocsContainer context={docsContext}>{children}</DocsContainer>
    </>
  );
};
