import { StoryObj } from "@storybook/react";

import Form from "../../templates/Form";
import FormRaw from "../../templates/Form?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Form",
  decorators: [templateDecorator],
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: FormRaw,
      },
    },
  },
  render: () => <Form />,
};
