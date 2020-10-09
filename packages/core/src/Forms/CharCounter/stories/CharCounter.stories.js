import React from "react";
import { HvCharCounter } from "../../..";

export default {
  title: "Forms/Form Element/Char Counter",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCharCounter } from '@hv/uikit-react-core/dist'",
    v3: true,
    dsVersion: "3.2.0",
  },
  component: HvCharCounter,
};

export const Main = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={106} maxCharQuantity={1500} />
);

export const DisabledCharCounter = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={106} maxCharQuantity={1500} disabled />
);

DisabledCharCounter.story = {
  parameters: {
    docs: {
      storyDescription: "Char counter showcasing the disabled state.",
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
  },
};

export const OverloadedCharCounter = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={1600} maxCharQuantity={1500} />
);

OverloadedCharCounter.story = {
  parameters: {
    docs: {
      storyDescription: "Char counter showcasing the overloaded state.",
    },
  },
};
