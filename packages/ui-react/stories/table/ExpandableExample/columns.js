import React from "react";
import Chart from "react-google-charts";

const getColumns = (theme, dismiss) => [
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
      const data = [
        [" ", " ", { role: "style" }],
        [" ", Number(cellData.row._original.allocateVsCapability), "color:black"]
      ];
      return (
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "5px", alignSelf: "center" }}>
            {cellData.row._original.allocateVsCapability}/1 TB
          </div>
          <Chart
            width="80px"
            height="30px"
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              legend: "none",
              hAxis: {
                minValue: 0,
                maxValue: 3
              }
            }}
          />
        </div>
      );
    }
  },
  {
    headerText: "Average compression rt.",
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

export default getColumns;
