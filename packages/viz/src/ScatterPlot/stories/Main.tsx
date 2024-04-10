import {
  HvScatterPlot,
  HvScatterPlotProps,
} from "@hitachivantara/uikit-react-viz";

export const Main = ({
  data,
  groupBy,
  measures,
  ...others
}: HvScatterPlotProps) => {
  const temperatureFormatter = (x?: string | number) => `${x}ºC`;

  return (
    <HvScatterPlot
      data={{
        Temperature: [
          20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48,
        ],
        Sales: [
          560, 498, 502, 536, 575, 753, 786, 983, 1025, 1286, 1822, 2150, 2200,
          1920, 1856,
        ],
      }}
      groupBy="Temperature"
      measures="Sales"
      yAxis={{
        name: "Number of Sales",
      }}
      xAxis={{
        minValue: 20,
        name: "Temperature",
        labelFormatter: temperatureFormatter,
      }}
      tooltip={{
        titleFormatter: temperatureFormatter,
      }}
      {...others}
    />
  );
};
