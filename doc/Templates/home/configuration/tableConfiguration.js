import moment from "moment";

const getColumns = () => [
  {
    headerText: "Title",
    accessor: "name",
    cellType: "alpha-numeric",
    fixed: "left",
    sortMethod: (a, b) => {
      if (a === b) {
        return 0;
      }
      const aReverse = Number(a.split(" ")[1]);
      const bReverse = Number(b.split(" ")[1]);
      return aReverse > bReverse ? 1 : -1;
    }
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
    cellType: "link",
    sortable: false
  }
];

export default getColumns;
