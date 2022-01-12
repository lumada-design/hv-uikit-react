import React from "react";

import LinkTo from "@storybook/addon-links/react";

import { HvTypography } from "@hitachivantara/uikit-react-core";

const labComponentTableConfig = [
  {
    headerText: "Component name",
    accessor: "component",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.path ? (
              <LinkTo
                kind={cellData.row._original.path}
                story={cellData.row._original.story || "Main"}
                className="sbdocs-a"
              >
                {cellData.row._original.component}
              </LinkTo>
            ) : (
              cellData.row._original.component
            )}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "DS Pattern name",
    accessor: "dsPattern",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.dsPattern != null ? cellData.row._original.dsPattern : "N/A"}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UI Kit v3.x",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.uikitVersion3 !== "--" ? (
              <HvTypography
                component="a"
                variant="link"
                href={`${cellData.row._original.uikitVersion3}`}
                target="_blank"
              >
                View Repository
              </HvTypography>
            ) : (
              "N/A"
            )}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UI Kit v2.x",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.uikitVersion2 !== "--" ? (
              <HvTypography
                component="a"
                variant="link"
                href={`${cellData.row._original.uikitVersion2}`}
                target="_blank"
              >
                View Repository
              </HvTypography>
            ) : (
              "N/A"
            )}
          </div>
        </div>
      );
    },
  },
];

export default labComponentTableConfig;
