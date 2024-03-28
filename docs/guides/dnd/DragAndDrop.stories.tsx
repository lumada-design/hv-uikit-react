import type { StoryObj } from "@storybook/react";

import { DndKitMultiple } from "./DndKitMultiple/DndKitMultiple";
import DndKitMultipleRaw from "./DndKitMultiple/DndKitMultiple?raw";
import { DndKitSingle } from "./DndKitSingle/DndKitSingle";
import DndKitSingleRaw from "./DndKitSingle/DndKitSingle?raw";
import { Vanilla } from "./Vanilla/Vanilla";
import VanillaRaw from "./Vanilla/Vanilla?raw";

export default {
  title: "Guides/Drag And Drop",
};

export const DndKitSingleStory: StoryObj = {
  name: "DndKit Single",
  parameters: {
    docs: { source: { code: DndKitSingleRaw } },
  },
  render: () => <DndKitSingle />,
};

export const DndKitMultipleStory: StoryObj = {
  name: "DndKit Multiple",
  parameters: {
    docs: { source: { code: DndKitMultipleRaw } },
  },
  render: () => <DndKitMultiple />,
};

export const VanillaStory: StoryObj = {
  name: "Native Javascript",
  parameters: {
    docs: { source: { code: VanillaRaw } },
  },
  render: () => <Vanilla />,
};
