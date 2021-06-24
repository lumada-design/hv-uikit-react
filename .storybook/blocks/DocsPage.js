import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { MaturityStatus } from "./MaturityStatus";
import { Usage } from "./Usage";
import { ArgsTable } from "./ArgsTable";
import { Deprecated } from "./Deprecated";

export default ({}) => (
  <>
    <Title />
    <Deprecated />
    <MaturityStatus />
    <Subtitle />
    <Description />
    <Usage />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
