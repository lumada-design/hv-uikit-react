import { StoryObj } from "@storybook/react";

import ListView from "../../templates/ListView";
import ListViewRaw from "../../templates/ListView?raw";

export default {
  title: "Templates/List View",
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: ListViewRaw,
      },
    },
  },
  render: () => <ListView />,
};
