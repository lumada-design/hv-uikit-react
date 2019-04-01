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
import HvTable from "@hv/uikit-react-core/dist/Table";
import Chart from "react-google-charts";

const data = [
  {
    id: 1,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small",
    sales: "2871.0",
    salesGrowth: "925.7",
    orderNumber: "10100",
    color: "red"
  },
  {
    id: 2,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small",
    sales: "2765.9",
    salesGrowth: "119.3",
    orderNumber: "10100",
    color: "orange"
  },
  {
    id: 3,
    customer: "Blauer See Auto, Co.",
    dealSize: "Medium",
    sales: "3884.3",
    salesGrowth: "94.7",
    orderNumber: "10101",
    color: "blue"
  },
  {
    id: 4,
    customer: "Online Diecast Creation",
    dealSize: "Medium",
    sales: "3746.7",
    salesGrowth: "30.2",
    orderNumber: "10102",
    color: "yellow"
  },
  {
    id: 5,
    customer: "Vitachrome Inc.",
    dealSize: "Small",
    sales: "5205.3",
    salesGrowth: "1000.6",
    orderNumber: "10102",
    color: "green"
  }
];

const getColumns = () => [
  {
    headerText: "Customer",
    accessor: "customer",
    cellType: "alpha-numeric"
  },
  {
    headerText: "Dealsize",
    accessor: "dealSize",
    cellType: "numeric"
  },
  {
    headerText: "Sales",
    accessor: "sales",
    cellType: "numeric"
  },
  {
    headerText: "Sales Growth",
    cellType: "numeric",
    Cell: cellData => {
      const value = [
        [" ", " ", { role: "style" }],
        [
          " ",
          Number(cellData.row._original.salesGrowth),
          `color:${cellData.row._original.color}`
        ]
      ];
      return (
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "30px", alignSelf: "center" }}>
            {cellData.row._original.salesGrowth}
€
          </div>
          <div style={{ alignSelf: "center" }}>
            <Chart
              width="100px"
              height="30px"
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={value}
              options={{
                legend: "none",
                hAxis: {
                  minValue: 0,
                  maxValue: 1001
                }
              }}
            />
          </div>
        </div>
      );
    }
  },
  {
    headerText: "Order Number",
    accessor: "orderNumber",
    cellType: "numeric"
  }
];

const defaults = {
  pageSize: 10,
  pages: data.length,
  sorted: [{ id: "createdDate", desc: true }],
  titleText: "This is The Title",
  subtitleText: "This is The Subtitle"
};

export default (
  <HvTable
    data={data}
    columns={getColumns()}
    defaultPageSize={defaults.pageSize}
    pageSize={defaults.pageSize}
    resizable
    pages={defaults.pages}
    defaultSorted={defaults.sorted}
    titleText="Sales overview"
    subtitleText="Click on a row to see store details"
    idForCheckbox="id"
  />
);
