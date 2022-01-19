import React from "react";
import { HvLabel } from "../../..";

export default {
  title: "Forms/Form Element Blocks/Label",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLabel } from "@hitachivantara/uikit-react-core"',
  },
  component: HvLabel,
};

export const Main = () => {
  return <HvLabel id="base" label="Username" />;
};

export const DisabledLabel = () => {
  return <HvLabel id="disable" label="Username" disabled />;
};
