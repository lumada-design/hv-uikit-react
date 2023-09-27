import { StoryObj } from "@storybook/react";
import Welcome from "../../templates/Welcome";
import WelcomeRaw from "../../templates/Welcome?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Welcome",
  decorators: [templateDecorator],
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: WelcomeRaw,
      },
    },
  },
  render: () => <Welcome />,
};
