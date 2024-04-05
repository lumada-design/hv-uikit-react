import { StoryObj } from "@storybook/react";

import DetailsView from "../../templates/DetailsView";
import DetailsViewRaw from "../../templates/DetailsView?raw";

export default {
  title: "Templates/Details View",
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: DetailsViewRaw,
      },
    },
  },
  render: () => <DetailsView />,
};
