import { StoryObj } from "@storybook/react";

import Dashboard from "../../templates/Dashboard";
import DashboardRaw from "../../templates/Dashboard?raw";

export default {
  title: "Templates/Dashboard",
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: DashboardRaw,
      },
    },
  },
  render: () => <Dashboard />,
};
