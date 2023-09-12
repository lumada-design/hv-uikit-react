import { StoryObj } from "@storybook/react";
import Dashboard from "../../templates/Dashboard";
import DashboardRaw from "../../templates/Dashboard?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Dashboard",
  decorators: [templateDecorator],
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
