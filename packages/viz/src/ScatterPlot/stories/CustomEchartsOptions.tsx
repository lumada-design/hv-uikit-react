import { HvScatterPlot } from "@hitachivantara/uikit-react-viz";

const values = [
  50, 65, 70, 73, 80, 88, 100, 120, 150, 186, 224, 286, 340, 380, 400,
];

export const CustomEchartsOptions = () => (
  <HvScatterPlot
    data={{
      y: values,
      x: Array.from(Array(values.length).keys()).map((i) => i + 1),
    }}
    groupBy="x"
    measures="y"
    onOptionChange={(option) => {
      option.series[0].markLine = {
        lineStyle: { type: "solid" },
        data: [
          [
            { coord: [0, 0], symbol: "none" },
            { coord: [15, 300], symbol: "none" },
          ],
        ],
        label: {
          formatter: "y = 20x",
          position: "insideMiddleTop",
        },
      };
      return option;
    }}
  />
);
