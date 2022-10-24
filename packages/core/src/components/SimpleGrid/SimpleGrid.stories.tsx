import { StoryObj } from "@storybook/react";
import { SimpleGrid, SimpleGridProps } from "./SimpleGrid";

export default { title: "Layout/SimpleGrid", component: SimpleGrid };

export const Main: StoryObj<SimpleGridProps> = {
  args: {
    children: "SimpleGrid",
  },
};
