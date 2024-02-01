import { StoryObj } from "@storybook/react";

import { TableEditable } from "./TableEditable";
import TableEditableRaw from "./TableEditable?raw";

export const EditableStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableEditableRaw } },
  },
  render: () => <TableEditable />,
};
