import React from "react";
import Chart from "react-google-charts";

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getData = (variation) => {
  if (variation === "up") {
    return [
      ["Count", "Requests"],
      ["1", getRandom(200, 500)],
      ["2", getRandom(500, 1000)],
      ["3", getRandom(1000, 2000)],
      ["4", getRandom(2000, 3000)],
    ];
  }
  return [
    ["Count", "Requests"],
    ["1", getRandom(2000, 3000)],
    ["2", getRandom(1000, 2000)],
    ["3", getRandom(500, 1000)],
    ["4", getRandom(200, 500)],
  ];
};

const TrendIndicator = ({ variation }) => (
  <div style={{ pointerEvents: "none", marginRight: -4 }}>
    <Chart
      width="50px"
      height="32px"
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={getData(variation)}
      options={{
        legend: "none",
        colors: variation === "up" ? ["green"] : ["red"],
        tooltip: {
          trigger: "none",
        },
        hAxis: {
          minValue: 0,
          maxValue: 10,
          gridlines: {
            color: "transparent",
          },
          baselineColor: "transparent",
        },
        backgroundColor: "transparent",
        vAxis: {
          gridlines: {
            color: "transparent",
          },
          baselineColor: "transparent",
        },
      }}
    />
  </div>
);

export default TrendIndicator;
