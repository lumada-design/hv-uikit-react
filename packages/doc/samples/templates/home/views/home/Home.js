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
// Used only in Storybook context.
import { linkTo } from "@storybook/addon-links";
import AssetInventory from "@hv/uikit-react-core/dist/AssetInventory";
import Typography from "@hv/uikit-react-core/dist/Typography";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import ListView from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import Cards from "@hv/uikit-react-icons/dist/Generic/Cards";
import List from "@hv/uikit-react-icons/dist/Generic/List";
import getData from "../../data/assetInventoryData";
import cardRenderer from "./assetViews/card/Card";
import rowRenderer from "./assetViews/list/List";
import assetInventoryConfiguration from "../../configuration/assetInventoryConfiguration";

const myActions = [
  { id: "details", label: "Details", disabled: false },
  { id: "dismiss", label: "Dismiss", disabled: false }
];

const control = (id, action) => {
  if (action.id === "details")
    // Used only for navigation across Storybook stores.
    linkTo("Templates", "Detail")();
};

const Home = ({ classes }) => {
  return (
    <div>
      <Typography variant="3xlTitle" className={classes.title}>
        Assets
      </Typography>
      <AssetInventory
        values={getData()}
        configuration={assetInventoryConfiguration}
        actions={myActions}
        maxVisibleActions={3}
        actionsCallback={control}
      >
        <CardView id="card" icon={<Cards />} renderer={cardRenderer} />
        <ListView id="list" icon={<List />} renderer={rowRenderer} />
      </AssetInventory>
    </div>
  );
};

export default Home;
