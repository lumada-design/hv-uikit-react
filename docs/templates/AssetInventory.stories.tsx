import AssetInventory from "../../templates/AssetInventory";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Asset Inventory",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  decorators: [templateDecorator],
};

export const Main = () => <AssetInventory />;
