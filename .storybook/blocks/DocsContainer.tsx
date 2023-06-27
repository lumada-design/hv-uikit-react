import React, { useMemo } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { Global } from "@storybook/theming";

import { HvProvider } from "@hitachivantara/uikit-react-core";

import { getDocsStyles } from "../theme/styles/docs";
import { useModeSelector } from "../addons/mode-selector/useModeSelector";
import { themes } from "../theme";

export default ({ context, children }) => {
  const dark = useModeSelector();

  const colors = themes[dark ? "wicked" : "dawn"].hvColors;

  const docsContext = {
    ...context,
    parameters: {
      ...context.parameters,
      docs: { ...context.parameters.docs },
    },
  };

  const docsStyles = useMemo(() => getDocsStyles(colors), [colors]);

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
