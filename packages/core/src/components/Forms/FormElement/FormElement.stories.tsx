import { Meta, StoryObj } from "@storybook/react";
import { HvFormElement, HvFormElementProps } from "components";

const meta: Meta<typeof HvFormElement> = {
  title: "FOLDER_HERE/FormElement",
  component: HvFormElement,
};
export default meta;

export const Main: StoryObj<HvFormElementProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvFormElement {...args}>List</HvFormElement>;
  },
};
