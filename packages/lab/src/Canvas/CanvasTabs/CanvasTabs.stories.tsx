import { Meta, StoryObj } from "@storybook/react";
import {
  HvCanvasTabs,
  HvCanvasTabsProps,
} from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvCanvasTabs> = {
  title: "Lab/Canvas/Tabs",
  component: HvCanvasTabs,
};
export default meta;

export const Main: StoryObj<HvCanvasTabsProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return <>Tabs</>;
  },
};
