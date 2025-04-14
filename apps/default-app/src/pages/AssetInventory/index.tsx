import { lazy } from "react";

import { MainContainer } from "../../components/MainContainer";

const AssetInventory = lazy(
  () => import("../../../../../templates/AssetInventory"),
);

const AssetInventoryWithContainer = () => (
  <MainContainer>
    <AssetInventory />
  </MainContainer>
);

export default AssetInventoryWithContainer;
