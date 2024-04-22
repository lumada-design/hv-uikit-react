import { StoryObj } from "@storybook/react";

import { TableComplete } from "./TableCompleteSample";
import TableCompleteRaw from "./TableCompleteSample?raw";

export default {
  title: "Visualizations/Table/Complete Table",
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableCompleteRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
    eyes: { include: true, waitBeforeCapture: 5000 },
  },
  render: () => <TableComplete />,
};
