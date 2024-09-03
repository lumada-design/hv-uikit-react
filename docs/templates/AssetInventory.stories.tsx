import { StoryObj } from "@storybook/react";

import AssetInventory from "../../templates/AssetInventory";
import AssetInventoryRaw from "../../templates/AssetInventory?raw";

export default {
  title: "Templates/Asset Inventory",
};

export const Main: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: false, delay: 5000 },
    docs: {
      source: {
        code: AssetInventoryRaw,
      },
    },
  },
  render: () => <AssetInventory />,
};
