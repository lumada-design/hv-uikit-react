import React from "react";

const labComponentTableConfig = [
  {
    headerText: "Component",
    accessor: "component",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            <a href={`${cellData.row._original.path}`}>{cellData.row._original.component}</a>
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UiKit V3.x",
    accessor: "uikitVersion3",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.uikitVersion3 !== "--" ? (
              <a href={`${cellData.row._original.uikitVersion3}`}>View Repository</a>
            ) : (
              "N/A"
            )}
          </div>
        </div>
      );
    },
  },
  {
    headerText: "UiKit V2.x",
    accessor: "uikitVersion2",
    cellType: "alpha-numeric",
    Cell: (cellData) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ alignSelf: "center" }}>
            {cellData.row._original.uikitVersion2 !== "--" ? (
              <a href={`${cellData.row._original.uikitVersion2}`}>View Repository</a>
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
