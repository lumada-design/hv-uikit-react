import { StoryObj } from "@storybook/react";

import DetailsView from "../../templates/DetailsView";
import DetailsViewRaw from "../../templates/DetailsView?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Details View",
  decorators: [templateDecorator],
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
