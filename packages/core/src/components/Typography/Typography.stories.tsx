import { StoryObj } from "@storybook/react";
import { HvTypography, HvTypographyProps } from "./Typography";

export default { title: "Theme/Typography", component: HvTypography };

export const Main: StoryObj<HvTypographyProps> = {
  args: {
    variant: "title1",
    link: false,
    children: "Welcome to NEXT Design System!",
  },
};
