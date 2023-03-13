import ReactChart from "react-google-charts";

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getTrendData = (variation: string) => {
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

interface IndicatorProps {
  variation: string;
}

export const Indicator = ({ variation }: IndicatorProps) => (
  <div style={{ pointerEvents: "none", marginRight: -4 }}>
    <ReactChart
      width="50px"
      height="32px"
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={getTrendData(variation)}
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
