import React from "react";
// Used only in Storybook context.
import { linkTo } from "@storybook/addon-links";
import AssetInventory from "@hv/uikit-react-core/dist/AssetInventory";
import Typography from "@hv/uikit-react-core/dist/Typography";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import ListView from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import { Cards, List } from "@hv/uikit-react-icons/dist";
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
        actionsCallback={control}
      >
        <CardView id="card" icon={<Cards />} renderer={cardRenderer} />
        <ListView id="list" icon={<List />} renderer={rowRenderer} />
      </AssetInventory>
    </div>
  );
};

export default Home;
