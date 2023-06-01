import { Meta, StoryObj } from "@storybook/react";
import { HvTimePicker, HvTimePickerProps } from "./TimePicker";
import { HvButton } from "..";

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
} as Meta<typeof HvTimePicker>;

export const Main: StoryObj<HvTimePickerProps> = {
  args: {},
  argTypes: {},
  render: (args) => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log(Object.fromEntries(formData.entries()));
        }}
      >
        <HvTimePicker
          id="time"
          name="time"
          label="Time Picker"
          timeFormat="H12"
          onChange={console.log}
          {...args}
        />
        <br />
        <HvButton type="submit">Submit</HvButton>
      </form>
    );
  },
};
