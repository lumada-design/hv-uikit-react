import React from "react";

import { HvColorPicker } from "../..";

export default {
  title: "Lab/ColorPicker",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvColorPicker } from '@hv/uikit-react-lab'",
  },
  component: HvColorPicker,
};

export const Main = () => (
  <div style={{ width: "240px" }}>
    <HvColorPicker label="Color" onChange={(color) => console.log(color)} />
  </div>
);
