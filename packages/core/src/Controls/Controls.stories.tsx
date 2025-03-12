import { Meta, StoryObj } from "@storybook/react";
import {
  HvControls,
  HvLeftControl,
  HvRightControl,
} from "@hitachivantara/uikit-react-core";

import { Controls as ControlsStory } from "./stories/Controls";
import ControlsRaw from "./stories/Controls?raw";
import { ControlsControlled as ControlsControlledStory } from "./stories/ControlsControlled";
import ControlsControlledRaw from "./stories/ControlsControlled?raw";
import { CustomControls as CustomControlsStory } from "./stories/CustomControls";
import CustomControlsRaw from "./stories/CustomControls?raw";
import { MixedControls as MixedControlsStory } from "./stories/MixedControls";
import MixedControlsRaw from "./stories/MixedControls?raw";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta<typeof HvControls> = {
  title: "Widgets/Controls",
  component: HvControls,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvLeftControl, HvRightControl },
};

export default meta;

export const Main: StoryObj = {
  parameters: {
    docs: { source: { code: ControlsRaw } },
    ...setupChromatic(),
  },
  render: () => <ControlsStory />,
};

export const ControlsControlled: StoryObj = {
  parameters: {
    docs: { source: { code: ControlsControlledRaw } },
  },
  render: () => <ControlsControlledStory />,
};

export const CustomControls: StoryObj = {
  parameters: {
    docs: { source: { code: CustomControlsRaw } },
  },
  render: () => <CustomControlsStory />,
};

export const MixedControls: StoryObj = {
  parameters: {
    docs: { source: { code: MixedControlsRaw } },
  },
  render: () => <MixedControlsStory />,
};
