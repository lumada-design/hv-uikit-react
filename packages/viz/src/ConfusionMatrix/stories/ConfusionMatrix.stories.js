import { HvConfusionMatrix } from "../..";

export default {
  title: "Visualizations/Confusion Matrix",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvConfusionMatrix } from "@hitachivantara/uikit-react-viz"',
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvConfusionMatrix,
};

export const Main = () => (
  <HvConfusionMatrix
    data={[
      {
        x: ["Beaver", "Lion", "Seal", "Dog"],
        y: ["Beaver", "Lion", "Seal", "Dog"],
        z: [
          [95, 10, 6, 2],
          [15, 97, 12, 9],
          [1, 8, 100, 12],
          [20, 40, 16, 90],
        ],
      },
    ]}
  />
);

export const DeltaMatrix = () => (
  <HvConfusionMatrix
    data={[
      {
        x: ["Beaver", "Lion", "Seal", "Dog"],
        y: ["Beaver", "Lion", "Seal", "Dog"],
        z: [
          [95, 10, 6, 2],
          [15, 97, 12, 9],
          [1, 8, 100, 12],
          [20, 40, 16, 90],
        ],
      },
    ]}
    deltaMatrix={[
      [90, 2, 4, 12],
      [25, 88, 1, 21],
      [10, 8, 90, 17],
      [20, 10, 4, 98],
    ]}
  />
);

export const CustomConfusionMatrix = () => (
  <HvConfusionMatrix
    data={[
      {
        x: ["Beaver", "Lion", "Seal", "Dog"],
        y: ["Beaver", "Lion", "Seal", "Dog"],
        z: [
          [95, 10, 6, 2],
          [15, 97, 12, 9],
          [1, 8, 100, 12],
          [20, 40, 16, 90],
        ],
        colorscale: [
          [0, "purple"],
          [1, "blue"],
        ],
      },
    ]}
    layout={{
      margin: {
        t: 0,
        b: 0,
      },
      width: 800,
      height: 800,
      xaxis: {
        color: "red",
        showline: true,
        showgrid: true,
        title: {
          text: "X Values",
          standoff: 50,
          font: {
            size: 14,
          },
        },
      },
      customAnnotations: {
        textColor: "white",
        size: 20,
        text: (value) => `<i>${value}</i>`,
      },
    }}
  />
);

export const ConfusionMatrixWithoutAnnotations = () => (
  <HvConfusionMatrix
    data={[
      {
        x: ["Beaver", "Lion", "Seal", "Dog"],
        y: ["Beaver", "Lion", "Seal", "Dog"],
        z: [
          [95, 10, 6, 2],
          [15, 97, 12, 9],
          [1, 8, 100, 12],
          [20, 40, 16, 90],
        ],
      },
    ]}
    layout={{
      annotations: {},
    }}
  />
);
