import React, { useContext } from "react";
import { Subtitle } from "@storybook/components";
import { DocsContext } from "@storybook/addon-docs";
import { getTheme } from "../theme";

export const Deprecated = () => {
  const context = useContext(DocsContext);
  const { compNameToUse, deprecated } = context.parameters;
  const theme = getTheme();

  return deprecated ? (
    <Subtitle style={{ color: theme.hv.palette.semantic.sema4 }}>
      {`Warning: This component is deprecated. Please use the ${compNameToUse}`}
    </Subtitle>
  ) : null;
};
