import { StoryObj } from "@storybook/react";

import { TableComplete } from "./TableCompleteSample";
import TableCompleteRaw from "./TableCompleteSample?raw";
import { setupChromatic } from ".storybook/setupChromatic";

export default {
  title: "Visualizations/Table/Complete Table",
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableCompleteRaw } },
    ...setupChromatic(["DS3 dawn", "DS5 dawn", "Pentaho+ dawn"]),
  },
  render: () => <TableComplete />,
};
