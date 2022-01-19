import React from "react";

import LinkTo from "@storybook/addon-links/react";

import Stable from "../../../.storybook/blocks/resources/Stable";
import DSVersion from "../../../.storybook/blocks/resources/DSVersion.js";

import componentDefinitions from "../ComponentVersioningTable/versions";

import { HvTypography } from "@hitachivantara/uikit-react-core";

const notAvailable = componentDefinitions.notAvailable;
const statusClassification = componentDefinitions.dsClassification;
const dsVersion1 = componentDefinitions.dsVersion.v1;
const dsVersion3 = componentDefinitions.dsVersion.v3;

const getMinorVersion = (v) => Number(v.split(".")[1]) || 0;

const dsVersion1Minor = getMinorVersion(dsVersion1);
const dsVersion3Minor = getMinorVersion(dsVersion3);

const coreComponentTableConfig = [
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
          <div style={{ alignSelf: "center" }}>{cellData.row._original.dsPattern}</div>
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
            <DSVersion
              dsVersion={cellData.row._original.uikitVersion3}
              fill={
                getMinorVersion(cellData.row._original.uikitVersion3) >= dsVersion3Minor
                  ? "#477DBD"
                  : "#7ECEE9"
              }
            />
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
            {cellData.row._original.uikitVersion2 != null &&
            cellData.row._original.uikitVersion2 != notAvailable ? (
              <DSVersion
                dsVersion={cellData.row._original.uikitVersion2}
                fill={
                  getMinorVersion(cellData.row._original.uikitVersion2) >= dsVersion1Minor
                    ? "#477DBD"
                    : "#7ECEE"
                }
              />
            ) : (
              notAvailable
            )}
          </div>
        </div>
      );
    },
  },
];

export default coreComponentTableConfig;
