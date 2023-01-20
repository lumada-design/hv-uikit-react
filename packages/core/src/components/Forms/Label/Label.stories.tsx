import { Meta, StoryObj } from "@storybook/react";
import { HvLabel, HvLabelProps } from "components";

const meta: Meta<typeof HvLabel> = {
  title: "Guides/Forms/Form Element Blocks/Label",
  component: HvLabel,
};
export default meta;

export const Main: StoryObj<HvLabelProps> = {
  args: {
    label: "My label",
    required: true,
    disabled: false,
    htmlFor: "my-label",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvLabel {...args} />;
  },
};
