import { StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default { title: "Inputs/Button", component: Button };

export const Main: StoryObj<ButtonProps> = {
  args: {
    children: "Button",
  },
};
