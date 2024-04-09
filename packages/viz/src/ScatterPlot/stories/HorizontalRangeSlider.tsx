import { HvScatterPlot } from "@hitachivantara/uikit-react-viz";

const genData = () =>
  Array.from(Array(2000).keys()).map((i) => i * 0.001 + Math.random());

export const HorizontalRangeSlider = () => (
  <HvScatterPlot
    data={{
      y: genData(),
      x: genData(),
    }}
    groupBy="x"
    measures="y"
    horizontalRangeSlider={{ show: true }}
  />
);
