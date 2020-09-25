// Copied from https://github.com/storybookjs/storybook/blob/v5.3.18/addons/docs/src/blocks/DocsPage.tsx
// to add a Usage block, customize the stories title and replace some blocks with our own versions

import React from "react";
import { Title, Subtitle, Description, Primary } from "@storybook/addon-docs/blocks";

import { Usage } from "./Usage";
import { Props } from "./Props";
import { Stories } from "./Stories";
import { Deprecated } from "./Deprecated";

export default ({
  titleSlot,
  subtitleSlot,
  descriptionSlot,
  primarySlot,
  usageSlot,
  propsSlot,
  storiesSlot
}) => {
  return (
    <>
      <Title slot={titleSlot} />
      <Subtitle slot={subtitleSlot} />
      <Description slot={descriptionSlot} />
      <Usage code={usageSlot} />
      <Deprecated />
      <Primary slot={primarySlot} />
      <Props slot={propsSlot} />
      <Stories title="Examples" slot={storiesSlot} />
    </>
  );
};
