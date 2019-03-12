import React from "react";
import moment from "moment";
import HvTable from "@hv-ui/react/core/Table";

const getColumns = () => [
    {
      headerText: "Title",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left"
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(value.original.createdDate).format("MM/DD/YYYY"),
      cellType: "numeric",
      fixed: "left"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link"
    }
];

const defaults = {
  pageSize: 10,
  pages: 12,
  sorted: [{ id: "createdDate", desc: true }],
  titleText: "This is The Title",
  subtitleText: "This is The Subtitle"
};

export default (
  <HvTable
    data={[]}
    columns={getColumns()}
    defaultPageSize={defaults.pageSize}
    pageSize={defaults.pageSize}
    resizable
    pages={defaults.pages}
    defaultSorted={defaults.sorted}
    titleText={defaults.titleText}
    subtitleText={defaults.subtitleText}
  />
);
