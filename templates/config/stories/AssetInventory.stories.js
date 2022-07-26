import { HvTypography } from "@hitachivantara/uikit-react-core";
import React from "react";
import AssetInventory from "../../AssetInventory/AssetInventory";

export default {
  title: "Templates/Asset Inventory",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
};

export const Main = () => {
  return (
    <>
      <div style={{ margin: 20, marginBottom: 40 }}>
        <HvTypography variant="normalText">
          The Asset Inventory page showcases all the items in the app and is constituted by 2 views:
          while the List View allows you to see all the information in a spreadsheet-like display,
          the Card View is where you can view the same items as blocks. Use both views or just one
          of them, according to your use case. You can access the code to this template{" "}
          <a
            target="_blank"
            href="https://github.com/lumada-design/hv-uikit-react/tree/master/templates/AssetInventory/"
            rel="noreferrer"
          >
            over at github
          </a>
        </HvTypography>
      </div>
      <AssetInventory />;
    </>
  );
};
