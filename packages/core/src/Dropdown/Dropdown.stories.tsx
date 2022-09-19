import { Story, Meta } from "@storybook/react";
import Dropdown, { DropdownProps } from "./Dropdown";

export default {
  component: Dropdown,
  title: "Dropdown",
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  value: "someValue",
  options: [
    { label: "Label 1", value: "value1" },
    { label: "Label 2", value: "value2" },
    { label: "Label 3", value: "value3" },
  ],
};
