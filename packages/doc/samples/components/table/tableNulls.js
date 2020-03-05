import React from "react";
import moment from "moment";
import HvTable from "@hv/uikit-react-core/dist/Table";

const data = [
  {
    id: 14,
    name: "Event 1",
    createdDate: "10/14/2018",
    eventType:
      "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
    status: "Open",
    riskScore: "98",
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" },
    subElementTitle: "cell_1",
    subElementTitle2: "cell_2"
  },
  {
    id: 13,
    name: "Event 2",
    createdDate: "10/14/2018",
    eventType: "Risk of failure profile",
    status: "Pending",
    riskScore: "90",
    severity: "Catastrophic",
    priority: "High",
    link: { displayText: "Asset 2", url: "blablabla" }
  },
  {
    id: 12,
    name: "Event 3",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Closed",
    riskScore: "98",
    severity: "Moderate",
    priority: "Medium",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 11,
    name: "Event 4",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Open",
    riskScore: null,
    severity: "Low",
    priority: "Low",
    link: { displayText: "Asset 3", url: "blablabla" }
  },
  {
    id: 10,
    name: "Event 5",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Pending",
    riskScore: null,
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 2", url: "blablabla" }
  },
  {
    id: 8,
    name: "Event 6",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Closed",
    riskScore: "98",
    severity: "Major",
    priority: "High",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 7,
    name: "Event 7",
    createdDate: null,
    eventType: "Anomaly detection",
    status: "Open",
    riskScore: "98",
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 6,
    name: "Event 8",
    createdDate: null,
    eventType: "Anomaly detection",
    status: "Pending",
    riskScore: "98",
    severity: "Moderate",
    priority: "Medium",
    link: { displayText: "Asset 2", url: "blablabla" }
  },
  {
    id: 5,
    name: "Event 9",
    createdDate: null,
    eventType: "Anomaly detection",
    status: "Open",
    riskScore: "98",
    severity: "Critical",
    priority: null,
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 4,
    name: "Event 1",
    createdDate: "10/14/2018",
    eventType: null,
    status: "Closed",
    riskScore: "98",
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 3,
    name: "Event 10",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: null,
    riskScore: "98",
    severity: "Major",
    priority: "High",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 2,
    name: "Event 11",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Open",
    riskScore: "98",
    severity: null,
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 1,
    name: "Event 12",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: null,
    riskScore: "98",
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  }
];

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: [{ id: "createdDate", desc: true }],
      pageSize: 10
    };
  }

  getColumns = () => [
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
      format: value =>
        moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
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

  onPageSizeChange = newPageSize => {
    this.setState({
      pageSize: newPageSize
    });
  };

  render() {
    const { pageSize, sorted } = this.state;

    const labels = {
      titleText: "This is a Title",
      subtitleText: "This is a Subtitle"
    };

    return (
      <HvTable
        data={data}
        columns={this.getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={sorted}
        labels={labels}
        onPageSizeChange={this.onPageSizeChange}
      />
    );
  }
}

export default <Wrapper />;
