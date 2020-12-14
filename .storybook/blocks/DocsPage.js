import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs/blocks";
import { MaturityStatus } from "./MaturityStatus";
import { Usage } from "./Usage";
import { ArgsTable } from "./ArgsTable";

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
