import React from "react";
// Used only in Storybook context.
// eslint-disable-next-line import/no-extraneous-dependencies
import { linkTo } from "@storybook/addon-links";
import {
  HvTypography,
  HvAssetInventory,
  HvCardView,
  HvListView,
} from "@hitachivantara/uikit-react-core";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import getData from "../../data/assetInventoryData";
import cardRenderer from "./assetViews/card/Card";
import rowRenderer from "./assetViews/list/List";
import assetInventoryConfiguration from "../../configuration/assetInventoryConfiguration";

const myActions = [
  { id: "details", label: "Details", disabled: false },
  { id: "dismiss", label: "Dismiss", disabled: false },
];

const control = (e, id, action) => {
  if (action.id === "details")
    // Used only for navigation across Storybook stores.
    linkTo("Templates", "Detail")();
};

const Home = ({ classes }) => {
  return (
    <div>
      <HvTypography variant="3xlTitle" className={classes.title}>
        Assets
      </HvTypography>
      <HvAssetInventory
        values={getData()}
        configuration={assetInventoryConfiguration}
        actions={myActions}
        actionsCallback={control}
      >
        <HvCardView id="card" icon={<Cards />} renderer={cardRenderer} />
        <HvListView id="list" icon={<List />} renderer={rowRenderer} />
      </HvAssetInventory>
    </div>
  );
};

export default Home;
