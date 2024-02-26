import { StoryObj } from "@storybook/react";

import { ServerSideTable } from "./ServerSideTable";
import ServerSideTableRaw from "./ServerSideTable?raw";

export const ServerSideTableStory: StoryObj = {
  parameters: {
    docs: { source: { code: ServerSideTableRaw } },
  },
  render: () => <ServerSideTable />,
};
