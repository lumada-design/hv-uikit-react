import { HvScatterPlot } from "@hitachivantara/uikit-react-viz";

const total = 10;
const start = new Date(0, 0, 0, 9, 0, 0);
const times = Array.from(Array(total).keys()).map((i) =>
  new Date(new Date(start).setHours(start.getHours() + i)).getTime(),
);
const genSales = () =>
  Array.from(Array(total)).map(() =>
    Math.floor(Math.random() * (5000 - 500 + 1) + 500),
  );

export const MultiplePlotsWithSplitBy = () => {
  const timeFormatter = (x?: string | number) =>
    x ? `${new Date(x).toLocaleTimeString()}` : "";

  return (
    <HvScatterPlot
      data={{
        Country: [
          ...Array.from(Array(total)).map(() => "Portugal"),
          ...Array.from(Array(total)).map(() => "Spain"),
        ],
        Time: [...times, ...times],
        Sales: [...genSales(), ...genSales()],
      }}
      groupBy="Time"
      measures="Sales"
      splitBy="Country"
      yAxis={{
        name: "Number of Sales",
      }}
      xAxis={{ type: "time" }}
      tooltip={{
        titleFormatter: timeFormatter,
      }}
    />
  );
};
