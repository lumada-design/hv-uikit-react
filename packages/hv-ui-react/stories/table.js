import React from "react";
import { storiesOf } from "@storybook/react";
import { HvTable } from "../src";
import {HvLink} from "../src";
import Popup from "../src/components/Table/Popup";

import orangeSquare from "../src/components/Table/Images/OrangeSquare.svg";
import redTriangle from "../src/components/Table/Images/RedTriangle.svg";

const data = require("./data/table_data.json");

storiesOf("Table", module).add("Table", () => (
  <HvTable
    data={data}
    cellHeight={64}
    headerHeight={32}
    defaultPageSize={10}
    columns={[
      {
        Header: "",
        Cell: row => (
          <img
            width={32}
            src={
              row.original.priority.toLowerCase() === "critical"
                ? redTriangle
                : orangeSquare
            }
          />
        ),
        width: 32,
        sortable: false,
        filterable: false,
        style: { padding: 0 }
      },
      {
        headerText: "Title",
        accessor: "title",
        style: { justifyContent: "flex-start" },
        headerStyle: { justifyContent: "flex-start" }
      },
      { headerText: "Time", accessor: "time" },
      { headerText: "Event Type", accessor: "eventType" },
      { headerText: "Status", accessor: "status" },
      { headerText: "Probability/Risk Score", accessor: "probability" },
      { headerText: "Severity/Criticalness", accessor: "severity" },
      { headerText: "Priority", accessor: "priority" },
      {
        headerText: "Asset",
        accessor: "asset",
        style: { color: "#1273D7" },
        Cell: row => {
          const path = `${row.original.asset}`;
          return (
            <HvLink href={path}>
              {row.original.asset}
            </HvLink>
          );
        }
      },
      {
        Header: "",
        Cell: () => <Popup />,
        width: 32,
        headerStyle: { borderLeft: "solid 1px #BCBCBC" },
        sortable: false,
        style: {
          padding: 0,
          justifyContent: "space-between",
          borderLeft: "solid 1px #BCBCBC"
        }
      }
    ]}
  />
));
