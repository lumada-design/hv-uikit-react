/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";

storiesOf("Components/Asset Inventory", module).add(
  "Card View",
  () => <CardView />,
  {
    title: "Card View",
    description:
      "Used to represent cards in th Asset Inventory component. It is possible to pass a custom card render por each card that must set placeholders for the data received. If no custom " +
      "render is passed, the default implementation of the card is used.<br><br>" +
      "When using a custom render, the configuration is passed to the render using a context provider (see example 3).",
    usage:
      "import HvCardView from '@hv/uikit-react-core/dist/AssetInventory/CardView'",
    examples: [
      {
        title: "1. Standard render",
        src: "components/assetInventoryCardView/cardView1"
      },
      {
        title: "2. Standard render with content",
        description:
          "Notice that the innerCardContent is passed as a prop that must be a function that receives a value parameter. ",
        src: "components/assetInventoryCardView/cardView2"
      },
      {
        title: "3. Custom render with custom actions",
        src: "components/assetInventoryCardView/cardView3"
      },
      {
        title: "4. Custom render with default actions",
        src: "components/assetInventoryCardView/cardView4"
      }
    ]
  }
);
