import { StoryObj } from "@storybook/react";

import Welcome from "../../templates/Welcome";
import WelcomeRaw from "../../templates/Welcome?raw";

export default {
  title: "Templates/Welcome",
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
