import React from "react";
import { storiesOf } from "@storybook/react";
import HvAssetInventory from "@hv/uikit-react-core/dist/AssetInventory";

storiesOf("Components/Asset Inventory", module).add("Asset Inventory", () => <HvAssetInventory />, {
  title: "Asset Inventory",
  description:
    "A asset inventory allows to switch between views. The sort and filter are defined using the metadata configuration. The remaining configuration can be ser in the asset or individual views (example 2 and 3).",
  usage: "import HvAssetInventory from '@hv/uikit-react-core/dist/AssetInventory'",
  examples: [
    {
      title: "1. Simple",
      description:
        "Search uses the headerTitle, schedule and probability. Sort uses the headerTitle, probability and timeHorizon",
      src: "components/assetInventory/assetInventory1.js"
    },
    {
      title: "2. with three views",
      src: "components/assetInventory/assetInventory2.js"
    },
    {
      title: "3. with configuration set in the asset inventory.",
      src: "components/assetInventory/assetInventory3.js"
    },
    {
      title: "4. Server Side pagination simulation",
      src: "components/assetInventory/assetInventory4.js"
    }
  ]
});
