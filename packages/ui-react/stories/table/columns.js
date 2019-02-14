import React from "react";
import moment from "moment";
import PriorityIcon from "./PriorityIcon";
import ActionsPopover from "./ActionsPopover";
import ActionsList from "./ActionsList";

const getColumns = (theme, dismiss) => [
  {
    headerText: "Title",
    accessor: "name",
    cellType: "alpha-numeric",
    fixed: "left"
  },
  {
    headerText: "Time",
    accessor: "createdDate",
    format: data => moment(data.original.createdDate).format("MM/DD/YYYY"),
    cellType: "numeric",
    fixed: "left"
  },
  {
    headerText: "Event Type",
    accessor: "eventType",
    format: data => data.original.eventType.replace("_", " ").toLowerCase(),
    style: { textTransform: "capitalize" },
    cellType: "alpha-numeric"
  },
  {
    headerText: "Status",
    accessor: "status",
    format: data => data.original.status.toLowerCase(),
    style: { textTransform: "capitalize" },
    cellType: "alpha-numeric"
  },
  {
    headerText: "Probability",
    accessor: "riskScore",
    format: data => `${data.original.riskScore}%`,
    cellType: "numeric"
  },
  {
    headerText: "Severity",
    accessor: "severity",
    format: data => data.original.severity.toLowerCase(),
    style: { textTransform: "capitalize" },
    cellType: "alpha-numeric"
  },
  {
    headerText: "Priority",
    accessor: "priority",
    format: data => data.original.priority.toLowerCase(),
    style: { textTransform: "capitalize" },
    cellType: "alpha-numeric"
  },
  {
    headerText: "Asset",
    accessor: "asset",
    cellType: "link"
  }
];

export default getColumns;
