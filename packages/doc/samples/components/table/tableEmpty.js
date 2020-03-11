import React from "react";
import moment from "moment";
import HvTable from "@hv/uikit-react-core/dist/Table";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: [{ id: "createdDate", desc: true }],
      pageSize: 0
    };
  }

  getColumns = () => [
    {
      headerText: "Title",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left"
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
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
        data={[]}
        columns={this.getColumns()}
        defaultPageSize={0}
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
