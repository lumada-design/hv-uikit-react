import React from "react";
import { HvLabel } from "../../..";

export default {
  title: "Components/Forms/Label",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLabel } from '@hv/uikit-react-core/dist'",
    v3: true
  },
  component: HvLabel
};

export const Main = () => {
  return <HvLabel id="base" label="Username" />;
};

export const DisabledLabel = () => {
  return <HvLabel id="disable" label="Username" disabled />;
};

DisabledLabel.parameters = {
  v3: true,
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  }
};
