import { Meta, StoryObj } from "@storybook/react";
import {
  HvCanvasFloatingPanel,
  HvCanvasFloatingPanelProps,
} from "@hitachivantara/uikit-react-pentaho";

import { MainStory } from "./stories/Main";
import MainRaw from "./stories/Main?raw";

const meta: Meta<typeof HvCanvasFloatingPanel> = {
  title: "Pentaho/Canvas/Floating Panel",
  component: HvCanvasFloatingPanel,
};
export default meta;

export const Main: StoryObj<HvCanvasFloatingPanelProps> = {
  args: { open: true },
  argTypes: {
    tabs: { control: { disable: true } },
    classes: { control: { disable: true } },
    tab: { control: { disable: true } },
    leftActions: { control: { disable: true } },
    rightActions: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
  },
  render: (args) => {
    return <MainStory {...args} />;
  },
};
