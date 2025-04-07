import { Meta, StoryObj } from "@storybook/react";
import {
  HvNumberInput,
  HvNumberInputProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvNumberInput> = {
  title: "Components/Number Input",
  component: HvNumberInput,
};
export default meta;

export const Main: StoryObj<HvNumberInputProps> = {
  args: {
    label: "Value",
    description: "Please enter a number",
    placeholder: "Enter a number here...",
    disabled: false,
    readOnly: false,
    required: true,
    status: "valid",
    statusMessage: "My status message",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-md">
        <HvNumberInput {...args} />
      </div>
    );
  },
};
