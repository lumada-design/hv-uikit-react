import React from "react";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import { MaturityStatus } from "./MaturityStatus";
import { Usage } from "./Usage";

export default ({}) => (
  <>
    <Title />
    <MaturityStatus />
    <Subtitle />
    <Description />
    <Usage />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
