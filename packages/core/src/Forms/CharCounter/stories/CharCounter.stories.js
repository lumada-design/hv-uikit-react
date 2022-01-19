import React from "react";
import { HvCharCounter } from "../../..";

export default {
  title: "Forms/Form Element Blocks/Char Counter",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCharCounter } from "@hitachivantara/uikit-react-core"',
  },
  component: HvCharCounter,
  decorators: [
    (Story) => (
      <div style={{ display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={106} maxCharQuantity={1500} />
);

export const DisabledCharCounter = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={106} maxCharQuantity={1500} disabled />
);

DisabledCharCounter.parameters = {
  docs: {
    description: { story: "Char counter showcasing the disabled state." },
  },
};

export const OverloadedCharCounter = () => (
  <HvCharCounter id="charCounter" currentCharQuantity={1600} maxCharQuantity={1500} />
);

OverloadedCharCounter.parameters = {
  docs: {
    description: { story: "Char counter showcasing the overloaded state." },
  },
};
