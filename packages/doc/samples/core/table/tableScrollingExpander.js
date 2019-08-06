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
import Chart from "react-google-charts";
import HvTable from "@hv/uikit-react-core/dist/Table";

const data = [
  {
    "id": 1,
    "dataCenter": "Denver",
    "storageSegment": "Open systems",
    "storageArray": 3,
    "allocateVsCapability": 2.5,
    "averageCompression": 1.62,
    "totalIOPS": 18649,
    "totalThroughput" : 1963.28,
    "averageServiceTime": 1.20,
    "averageReadTime": 1.83
  },
  {
    "id": 2,
    "dataCenter": "Virginia",
    "storageSegment": "Tandem",
    "storageArray": 3,
    "allocateVsCapability": 2.5,
    "averageCompression": 1.7,
    "totalIOPS": 8652,
    "totalThroughput" : 1013.01,
    "averageServiceTime": 5.16,
    "averageReadTime": 1.45
  },
  {
    "id": 3,
    "dataCenter": "Virginia",
    "storageSegment": "Tandem",
    "storageArray": 3,
    "allocateVsCapability": 2,
    "averageCompression": 1.91,
    "totalIOPS": 10459,
    "totalThroughput" : 923.65,
    "averageServiceTime": 1.38,
    "averageReadTime": 1.05
  }
];

class Wrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      sorted: [{ id: "createdDate", desc: true }],
    };
  }

  getColumns = () => [
    {
      headerText: "Data Center",
      accessor: "dataCenter",
      cellType: "alpha-numeric",
      fixed: "left"
    },
    {
      headerText: "Storage segment",
      width: 120,
      accessor: "storageSegment",
      cellType: "alpha-numeric"
    },
    {
      headerText: "Storage array",
      accessor: "storageArray",
      cellType: "numeric"
    },
    {
      headerText: "Allocated vs avail.capability",
      cellType: "numeric",
      width:140,
      Cell: cellData => {
        const value = [
          [" ", " ", { role: "style" }],
          [" ", Number(cellData.row._original.allocateVsCapability), "color:black"]
        ];
        return (
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "5px", alignSelf: "center" }}>
              {cellData.row._original.allocateVsCapability}
  /1 TB
            </div>
            <Chart
              width="80px"
              height="30px"
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={value}
              options={{
                legend: "none",
                hAxis: {
                  minValue: 0,
                  maxValue: 3
                },
                backgroundColor: "transparent"
              }}
            />
          </div>
        );
      }
    },
    {
      headerText: "Average compression rt",
      accessor: "averageCompression",
      width:150,
      cellType: "numeric",
      Cell: cellData => `${cellData.row._original.averageCompression}:1`
    },
    {
      headerText: "Total IOPS",
      accessor: "totalIOPS",
      cellType: "numeric",
      Cell: cellData => cellData.row._original.totalIOPS.toLocaleString('en-US')
    },
    {
      headerText: "Total throughput",
      accessor: "totalThroughput",
      width: 130,
      cellType: "numeric",
      Cell: cellData => `${ cellData.row._original.totalThroughput.toLocaleString('en-US')} MB/s`
    },
    {
      headerText: "Average service time",
      accessor: "averageServiceTime",
      width: 130,
      cellType: "numeric",
      Cell: cellData => `${cellData.row._original.averageServiceTime} ms`
    },
    {
      headerText: "Average read time",
      accessor: "averageReadTime",
      width: 130,
      cellType: "numeric",
      Cell: cellData => `${cellData.row._original.averageReadTime} ms`
    }
  ];

  subElementTemplate = () => (
    <div>
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  )

  onPageSizeChange = newPageSize => {
    this.setState({
      pageSize: newPageSize
    });
  };

  render() {
    const {sorted, pageSize} = this.state;

    const labels = {
      titleText: "Storage arrays",
      subtitleText: "Click data centers or storage arrays to drill down"
    }

    return(
      <HvTable
        data={data}
        columns={this.getColumns()}
        onPageSizeChange={this.onPageSizeChange}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}

        defaultSorted={sorted}
        labels={labels}
        subElementTemplate={this.subElementTemplate}
      />
    )
  }

}

export default (
  <Wrapper />
);
