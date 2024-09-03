import { StoryObj } from "@storybook/react";

import Form from "../../templates/Form";
import FormRaw from "../../templates/Form?raw";

export default {
  title: "Templates/Form",
};

export const Main: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: FormRaw,
      },
    },
  },
  render: () => <Form />,
};
