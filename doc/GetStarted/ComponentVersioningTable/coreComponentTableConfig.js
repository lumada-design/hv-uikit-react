import React from "react";

import Stable from "../../../.storybook/blocks/resources/Stable";
import DSVersion from "../../../.storybook/blocks/resources/DSVersion.js";

import { HvLink } from "../../../packages/core/src/..";

const coreComponentTableConfig = [
  {
    headerText: "Component",
    accessor: "component",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.path ? (
              <HvLink route={`${cellData.row._original.path}`}>
                {cellData.row._original.component}
              </HvLink>
            ) : (
              cellData.row._original.component
            )}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UI Kit v3.x",
    accessor: "uikitVersion3",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            <DSVersion dsVersion={cellData.row._original.uikitVersion3} />
          </div>
          <div style={{ alignSelf: "center", marginLeft: 10 }}>
            {cellData.row._original.status === "stable" && <Stable />}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UI Kit v2.x",
    accessor: "uikitVersion2",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            <DSVersion dsVersion={cellData.row._original.uikitVersion2} />
          </div>
        </div>
      );
    },
  },
];

export default coreComponentTableConfig;
