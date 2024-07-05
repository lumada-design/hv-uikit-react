import { Meta, StoryObj } from "@storybook/react";
import { Alert, Debug, Report } from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasTab,
  HvCanvasTabs,
  HvCanvasTabsProps,
} from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvCanvasTabs> = {
  title: "Lab/Canvas/Tabs",
  component: HvCanvasTabs,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvCanvasTab },
};
export default meta;

export const Main: StoryObj<HvCanvasTabsProps> = {
  args: { defaultValue: 0 },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvCanvasTabs {...args}>
        <HvCanvasTab value={0}>
          <Report />
          Tab 1
        </HvCanvasTab>
        <HvCanvasTab value={1}>
          <Alert />
          Tab 2
        </HvCanvasTab>
        <HvCanvasTab value={2}>
          <Debug />
          Tab 3
        </HvCanvasTab>
      </HvCanvasTabs>
    );
  },
};
