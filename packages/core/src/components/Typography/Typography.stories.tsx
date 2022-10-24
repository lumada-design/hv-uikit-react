import { StoryObj } from "@storybook/react";
import { Typography, TypographyProps } from "./Typography";

export default { title: "Theme/Typography", component: Typography };

export const Main: StoryObj<TypographyProps> = {
  args: {
    variant: "title1",
    children: "Welcome to NEXT Design System!",
  },
};
