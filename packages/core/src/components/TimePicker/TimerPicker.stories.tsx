import { Meta, StoryObj } from "@storybook/react";
import { HvTimePicker, HvTimePickerProps } from ".";

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
} as Meta<typeof HvTimePicker>;

export const Main: StoryObj<HvTimePickerProps> = {
  args: {},
  argTypes: {},
  render: (args) => {
    return (
      <div>
        <HvTimePicker {...args} />
      </div>
    );
  },
};
