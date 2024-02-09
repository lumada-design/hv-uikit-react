import { StoryObj } from "@storybook/react";

import { Chart as ChartStory } from "./Chart";
import ChartRaw from "./Chart?raw";

export default {
  title: "Guides/Visualizations",
};

export const Chart: StoryObj = {
  parameters: { docs: { source: { code: ChartRaw } } },
  render: () => <ChartStory />,
};
