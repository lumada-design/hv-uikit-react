import { HvScatterPlot } from "../ScatterPlot";

const start = new Date(0, 0, 0, 6, 0, 0);
const times = Array.from(Array(15).keys()).map((i) =>
  new Date(new Date(start).setHours(start.getHours() + i)).getTime(),
);

export const MultipleYAxes = () => {
  const temperatureFormatter = (x?: string | number) => `${x}ºC`;

  const humidityFormatter = (x?: string | number) => `${x}%`;

  const timeFormatter = (x?: string | number) =>
    x ? `${new Date(x).toLocaleTimeString()}` : "";

  return (
    <HvScatterPlot
      data={{
        Humidity: [42, 46, 48, 50, 40, 35, 30, 22, 21, 12, 10, 15, 18, 22, 22],
        Temperature: [
          20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 38, 35, 30, 28,
        ],
        Time: times,
      }}
      groupBy="Time"
      measures={[
        {
          yAxis: "temp",
          field: "Temperature",
          valueFormatter: temperatureFormatter,
        },
        {
          yAxis: "humidity",
          field: "Humidity",
          valueFormatter: humidityFormatter,
        },
      ]}
      yAxis={[
        {
          id: "temp",
          name: "Temperature",
          labelFormatter: temperatureFormatter,
        },
        {
          id: "humidity",
          name: "Humidity",
          labelFormatter: humidityFormatter,
          minValue: 10,
        },
      ]}
      xAxis={{
        type: "time",
      }}
      tooltip={{
        titleFormatter: timeFormatter,
      }}
    />
  );
};
