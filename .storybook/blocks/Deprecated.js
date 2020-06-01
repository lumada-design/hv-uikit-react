import React, { useContext } from "react";
import { Subtitle } from "@storybook/components";
import { DocsContext } from "@storybook/addon-docs/blocks";
import { getStoredTheme, getStorybookTheme } from "../themes";

export const Deprecated = () => {
  const context = useContext(DocsContext);
  const { compNameToUse, deprecated } = context.parameters;
  const theme = getStorybookTheme(getStoredTheme());

  return deprecated ? (
    <Subtitle style={{ color: theme.hv.palette.semantic.sema4 }}>
      {`Warning: This component is deprecated. Please use the ${compNameToUse}`}
    </Subtitle>
  ) : null;
};
