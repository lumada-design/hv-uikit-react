import { Story, Meta } from "@storybook/react";
import Dropdown, { DropdownProps } from "./Dropdown";

export default {
  component: Dropdown,
  title: "Dropdown",
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Some Label",
  value: "someValue",
  options: [{ label: "Some Label", value: "someValue" }],
};
