import React from "react";
import { storiesOf } from "@storybook/react";
import ListView from "@hv/uikit-react-core/dist/AssetInventory/ListView";

storiesOf("Components/Asset Inventory", module).add(
  "List View",
  () => <ListView />,
  {
    title: "List View",
    description: "",
    usage:
      "import HvListView from '@hv/uikit-react-core/dist/AssetInventory/ListView'",
    examples: [
      {
        title: "1 - Complete usage",
        src: "components/assetInventoryListView/sample.js"
      },
      {
        title: "2 - Not selectable",
        src: "components/assetInventoryListView/sampleNotSelectable.js"
      },
      {
        title: "3 - Not selectable with menu",
        description:
          "Sample usage of AssetInventoryListView but is not configured",
        src: "components/assetInventoryListView/sampleNotSelectableWithMenu.js"
      },
      {
        title: "4 - No configuration",
        src: "components/assetInventoryListView/sampleNotStyled.js"
      }
    ]
  }
);
