import { StoryObj } from "@storybook/react";

import AssetInventory from "../../templates/AssetInventory";
import AssetInventoryRaw from "../../templates/AssetInventory?raw";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Asset Inventory",
  decorators: [templateDecorator],
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: AssetInventoryRaw,
      },
    },
  },
  render: () => <AssetInventory />,
};
