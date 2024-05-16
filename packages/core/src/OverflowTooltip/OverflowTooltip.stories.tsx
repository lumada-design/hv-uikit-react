import { Meta, StoryObj } from "@storybook/react";
import {
  HvOverflowTooltip,
  HvOverflowTooltipProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvOverflowTooltip> = {
  title: "Components/Tooltip/Overflow Tooltip",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 auto",
          height: 200,
          maxWidth: 200,
        }}
      >
        {Story()}
      </div>
    ),
  ],
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
  },
  render: (args) => {
    return <HvOverflowTooltip {...args} />;
  },
};
