import { StoryObj } from "@storybook/react";
import { screen, waitFor } from "@storybook/testing-library";

import { TableComplete } from "./TableCompleteSample";
import TableCompleteRaw from "./TableCompleteSample?raw";

export default {
  title: "Visualizations/Table/Complete Table",
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableCompleteRaw } },
    eyes: {
      runBefore: () =>
        waitFor(() => screen.getByRole("button", { name: /Next Page/i })),
    },
  },
  render: () => <TableComplete />,
};
