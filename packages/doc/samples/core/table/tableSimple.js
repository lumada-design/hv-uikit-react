/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    riskScore: "98",
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
    riskScore: "98",
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
    createdDate: "10/14/2018",
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
    createdDate: "10/14/2018",
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
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Open",
    riskScore: "98",
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 4,
    name: "Event 1",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
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
    status: "Open",
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
    severity: "Critical",
    priority: "Critical",
    link: { displayText: "Asset 1", url: "blablabla" }
  },
  {
    id: 1,
    name: "Event 12",
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: "Open",
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

  onPageSizeChange = newPageSize => {
    this.setState({
      pageSize: newPageSize
    });
  };

  render() {
    const { pageSize, sorted, titleText, subtitleText } = this.state;

    const labels = {
      titleText: "This is The Title",
      subtitleText: "This is The Subtitle"
    }

    return (
      <HvTable
        data={data}
        id="test"
        columns={this.getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable
        defaultSorted={sorted}
        labels={labels}
        onPageSizeChange={this.onPageSizeChange}
      />
    );
  }
}

export default <Wrapper />;
