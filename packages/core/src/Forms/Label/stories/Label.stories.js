import React from "react";

import { HvLabel } from "../../..";

export default {
  title: "Components/Forms/Label",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLabel } from '@hv/uikit-react-core/dist'"
  },
  component: HvLabel
};

export const Main = () => {
  return <HvLabel id="base" label="Username" />;
};

export const disabledInfoText = () => {
  return <HvLabel id="disable" label="Username" disabled />;
};
