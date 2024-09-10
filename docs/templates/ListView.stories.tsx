import { StoryObj } from "@storybook/react";

import ListView from "../../templates/ListView";
import ListViewRaw from "../../templates/ListView?raw";

export default {
  title: "Templates/List View",
};

export const Main: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: true, delay: 5000 },
    docs: {
      source: {
        code: ListViewRaw,
      },
    },
  },
  render: () => <ListView />,
};
