import type { StoryObj } from "@storybook/react";

import { DndKitSingle } from "./DndKitSingle/DndKitSingle";
import DndKitSingleRaw from "./DndKitSingle/DndKitSingle?raw";
import { DndKitMultiple } from "./DndKitMultiple/DndKitMultiple";
import DndKitMultipleRaw from "./DndKitMultiple/DndKitMultiple?raw";
import { Vanilla } from "./Vanilla/Vanilla";
import VanillaRaw from "./Vanilla/Vanilla?raw";

export const DndKitSingleStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: DndKitSingleRaw } },
  },
  render: () => <DndKitSingle />,
};

export const DndKitMultipleStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: DndKitMultipleRaw } },
  },
  render: () => <DndKitMultiple />,
};

export const VanillaStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: VanillaRaw } },
  },
  render: () => <Vanilla />,
};
