import { StoryObj } from "@storybook/react";
import ListView from "../../templates/ListView";
import ListViewRaw from "../../templates/ListView?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/List View",
  decorators: [templateDecorator],
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
