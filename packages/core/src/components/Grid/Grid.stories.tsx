import { StoryObj } from "@storybook/react";
import { Grid, GridProps } from "./Grid";

export default { title: "Layout/Grid", component: Grid };

export const Main: StoryObj<GridProps> = {
  args: {
    children: "Grid",
  },
};
