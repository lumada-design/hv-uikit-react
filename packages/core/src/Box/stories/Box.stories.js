import React from "react";
import { HvBox, HvButton } from "../..";

export default {
  title: "Components/Box",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBox } from '@hv/uikit-react-core/dist'"
  },
  component: HvBox
};

export const Main = () => (
  <HvBox display="inline-flex" py={2} px={4} bgcolor="sema3">
    <HvButton category="semantic">Button</HvButton>
  </HvBox>
);
