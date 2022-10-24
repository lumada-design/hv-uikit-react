import { StoryObj } from "@storybook/react";
import { Stack, StackProps } from "./Stack";

export default { title: "Layout/Stack", component: Stack };

export const Main: StoryObj<StackProps> = {
  args: {
    children: "Stack",
  },
};
