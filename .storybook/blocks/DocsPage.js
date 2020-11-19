// Copied from https://github.com/storybookjs/storybook/blob/v6.0.21/addons/docs/src/blocks/DocsPage.tsx
// to add a Usage and Deprecated blocks and customize the Stories section title.

import React from "react";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs/blocks";

import { Usage } from "./Usage";
import { Deprecated } from "./Deprecated";
import { MaturityStatus } from "./MaturityStatus";

export default ({ usageSlot, maturityStatusSlot }) => {
  return (
    <>
      <Title />
      <MaturityStatus slot={maturityStatusSlot} />
      <Subtitle />
      <Description />
      <Usage code={usageSlot} />
      <Deprecated />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories title="Examples" />
    </>
  );
};
