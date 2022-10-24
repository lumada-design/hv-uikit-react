import { StoryObj } from "@storybook/react";
import { Header, HeaderProps } from "./Header";

export default { title: "Structure/Header", component: Header };

export const Main: StoryObj<HeaderProps> = {
  args: {
    children: "Header",
  },
};
