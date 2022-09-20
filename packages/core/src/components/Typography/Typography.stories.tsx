import { Story, Meta } from "@storybook/react";
import Typography, { TypographyProps } from "./Typography";

export default {
  component: Typography,
  title: "Typography",
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: "body",
  children: "Typography",
};
