import { StoryObj } from "@storybook/react";
import { Container, ContainerProps } from "./Container";

export default { title: "Layout/Container", component: Container };

export const Main: StoryObj<ContainerProps> = {
  args: {
    children: "Container",
  },
};
