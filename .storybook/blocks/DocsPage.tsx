import React from "react";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from "@storybook/blocks";

export const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    {/* `story="^"` enables Controls for the primary props table */}
    <ArgsTable story="^" />
    <Stories includePrimary={false} />
  </>
);
