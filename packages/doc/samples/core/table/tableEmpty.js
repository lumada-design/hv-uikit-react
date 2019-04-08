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

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: [{ id: "createdDate", desc: true }],
      titleText: "This is The Title",
      subtitleText: "This is The Subtitle",
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

    return (
      <HvTable
        data={[]}
        columns={this.getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable
        defaultSorted={sorted}
        titleText={titleText}
        subtitleText={subtitleText}
        onPageSizeChange={this.onPageSizeChange}
      />
    );
  }
}

export default <Wrapper />;
