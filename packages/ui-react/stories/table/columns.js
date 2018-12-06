import React from "react";
import moment from "moment";
import PriorityIcon from "./PriorityIcon";
import ActionsPopover from "./ActionsPopover";
import ActionsList from "./ActionsList";

const getColumns = (theme, dismiss) => [
  {
    Header: "",
    width: 32,
    sortable: false,
    filterable: false,
    style: { padding: 0 },
    Cell: data => <PriorityIcon priority={data.original.priority} />
  },
  {
    headerText: "Title",
    getHeaderProps: () => ({
      style: {
        justifyContent: "flex-start"
      }
    }),
    accessor: "name",
    style: { justifyContent: "flex-start" }
  },
  {
    headerText: "Time",
    accessor: "createdDate",
    Cell: data => moment(data.original.createdDate).format("MM/DD/YYYY"),
    width: 70
  },
  {
    headerText: "Event Type",
    accessor: "eventType",
    Cell: data => data.original.eventType.replace("_", " ").toLowerCase(),
    style: { textTransform: "capitalize" }
  },
  {
    headerText: "Status",
    accessor: "status",
    Cell: data => data.original.status.toLowerCase(),
    style: { textTransform: "capitalize" },
    width: 90
  },
  {
    headerText: "Probability/Risk Score",
    accessor: "riskScore",
    Cell: data => `${data.original.riskScore}%`
  },
  {
    headerText: "Severity/Criticalness",
    accessor: "severity",
    Cell: data => data.original.severity.toLowerCase(),
    style: { textTransform: "capitalize" }
  },
  {
    headerText: "Priority",
    accessor: "priority",
    Cell: data => data.original.priority.toLowerCase(),
    style: { textTransform: "capitalize" },
    width: 100
  },
  {
    headerText: "Asset",
    accessor: "asset",
    style: { color: `${theme.palette.primary.main}` }
  },
  {
    Header: "",
    width: 32,
    getHeaderProps: () => ({
      style: {
        borderLeft: `solid 1px ${theme.palette.grey.plain}`
      }
    }),
    sortable: false,
    style: {
      padding: 0,
      justifyContent: "space-between",
      borderLeft: `solid 1px ${theme.palette.grey.plain}`
    },
    Cell: data => (
      <ActionsPopover>
        <ActionsList eventId={data.original.id} dismiss={dismiss} />
      </ActionsPopover>
    )
  }
];

export default getColumns;
