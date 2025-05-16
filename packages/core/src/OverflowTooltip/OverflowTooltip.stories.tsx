import type { Meta, StoryObj } from "@storybook/react";
import {
  HvOverflowTooltip,
  HvOverflowTooltipProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvOverflowTooltip> = {
  title: "Components/Overflow Tooltip",
  component: HvOverflowTooltip,
};
export default meta;

export const Main: StoryObj<HvOverflowTooltipProps> = {
  args: {
    open: true,
    placement: "top",
    data: "This is a very long text that should be cut because it so long that it doesn't fit",
    paragraphOverflow: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center mx-auto h-200px max-w-200px">
        {Story()}
      </div>
    ),
  ],
  render: (args) => {
    return <HvOverflowTooltip {...args} />;
  },
};
