import { Meta, StoryObj } from "@storybook/react";
import { HvCharCounter, HvCharCounterProps } from "components";

const meta: Meta<typeof HvCharCounter> = {
  title: "Guides/Forms/Form Element Blocks/Char Counter",
  component: HvCharCounter,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexDirection: "row" }}>{Story()}</div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvCharCounterProps> = {
  args: {
    separator: "/",
    maxCharQuantity: 20,
    currentCharQuantity: 5,
    disabled: false,
    disableGutter: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvCharCounter {...args}>List</HvCharCounter>;
  },
};
