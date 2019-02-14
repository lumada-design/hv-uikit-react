import React from "react";
import Chart from "react-google-charts";

const getColumns = (theme, dismiss) => [
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
      const data = [
        [" ", " ", { role: "style" }],
        [" ", Number(cellData.row._original.salesGrowth), `color:${cellData.row._original.color}`]
      ];
      return (
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "30px", alignSelf: "center" }}>
            {cellData.row._original.salesGrowth}€
          </div>
          <div style={{ alignSelf: "center"}}>
          <Chart
            width="100px"
            height="30px"
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data}
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

export default getColumns;
