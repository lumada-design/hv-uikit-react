import { StoryObj } from "@storybook/react";

import { TableComplete } from "./TableCompleteSample";
import TableCompleteRaw from "./TableCompleteSample?raw";

export default {
  title: "Visualizations/Table/Complete Table",
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableCompleteRaw } },
  },
  render: () => <TableComplete />,
};
