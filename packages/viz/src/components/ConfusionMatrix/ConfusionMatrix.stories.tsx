import {
  HvConfusionMatrix,
  HvConfusionMatrixProps,
} from "@hitachivantara/uikit-react-viz";
import { Meta, StoryObj } from "@storybook/react";
import { vizDecorator } from "../BaseChart/stories/utils";

const meta: Meta<typeof HvConfusionMatrix> = {
  title: "Visualizations/Confusion Matrix",
  component: HvConfusionMatrix,
  parameters: { eyes: { include: false } },
  decorators: [vizDecorator],
};
export default meta;

const mockData = {
  prediction: [
    "Beaver",
    "Beaver",
    "Beaver",
    "Beaver",
    "Lion",
    "Lion",
    "Lion",
    "Lion",
    "Seal",
    "Seal",
    "Seal",
    "Seal",
    "Dog",
    "Dog",
    "Dog",
    "Dog",
  ],
  expected: [
    "Beaver",
    "Lion",
    "Seal",
    "Dog",
    "Beaver",
    "Lion",
    "Seal",
    "Dog",
    "Beaver",
    "Lion",
    "Seal",
    "Dog",
    "Beaver",
    "Lion",
    "Seal",
    "Dog",
  ],
  matches: [95, 15, 1, 20, 10, 97, 8, 40, 6, 12, 100, 16, 2, 9, 12, 90],
};

export const Main: StoryObj<HvConfusionMatrixProps> = {
  args: {
    format: "square",
  },
  argTypes: {
    measure: { control: { disable: true } },
    splitBy: { control: { disable: true } },
    data: { control: { disable: true } },
    delta: { control: { disable: true } },
    xAxis: { control: { disable: true } },
    yAxis: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    valuesProps: { control: { disable: true } },
    classes: { control: { disable: true } },
    groupBy: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    legend: { control: { disable: true } },
    grid: { control: { disable: true } },
  },
  render: ({ data, measure, groupBy, splitBy, sortBy, ...others }) => {
    return (
      <HvConfusionMatrix
        data={{
          prediction: mockData.prediction,
          expected: mockData.expected,
          matches: mockData.matches,
        }}
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
        {...others}
      />
    );
  },
};

export const DeltaConfusionMatrix: StoryObj<HvConfusionMatrixProps> = {
  render: () => {
    return (
      <HvConfusionMatrix
        data={{
          prediction: mockData.prediction,
          expected: mockData.expected,
          matches: mockData.matches,
          baseline: [
            90, 15, 1, 20, 10, 100, 8, 40, 4, 12, 90, 16, 2, 21, 12, 90,
          ],
        }}
        delta="baseline"
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
      />
    );
  },
};

export const SemanticConfusionMatrix: StoryObj<HvConfusionMatrixProps> = {
  render: () => {
    return (
      <HvConfusionMatrix
        data={{
          prediction: mockData.prediction,
          expected: mockData.expected,
          matches: [
            0, 0.15, 0, 0, 0, 0.97, 0, 0, 0.6, 0.12, 0, 0, 0.2, 0.9, 0, 0,
          ],
        }}
        colorScale={[
          {
            label: "Good",
            color: "positive",
            max: 1,
            min: 0.75,
          },
          {
            label: "Caution",
            color: "warning",
            max: 0.75,
            min: 0.3,
          },
          {
            label: "Bad",
            color: "negative",
            max: 0.3,
            min: 0,
          },
          {
            label: "Neutral",
            color: "atmo2",
            value: 0,
          },
        ]}
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
      />
    );
  },
};

export const CustomConfusionMatrix: StoryObj<HvConfusionMatrixProps> = {
  render: () => {
    return (
      <HvConfusionMatrix
        data={{
          prediction: mockData.prediction,
          expected: mockData.expected,
          matches: mockData.matches,
        }}
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
        width={800}
        height={800}
        colorScale={["purple", "blue"]}
        yAxis={{
          name: "Expected Values",
          nameProps: {
            color: "red",
            fontSize: 14,
          },
        }}
        xAxis={{
          name: "X Values",
          position: "bottom",
          nameProps: {
            color: "red",
            fontSize: 14,
          },
        }}
        valuesProps={{
          color: "white",
          fontSize: 20,
          fontStyle: "italic",
        }}
      />
    );
  },
};

export const ConfusionMatrixWithoutValues: StoryObj<HvConfusionMatrixProps> = {
  render: () => {
    return (
      <HvConfusionMatrix
        data={{
          prediction: mockData.prediction,
          expected: mockData.expected,
          matches: mockData.matches,
        }}
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
        valuesProps={{ show: false }}
      />
    );
  },
};

export const LandscapeFormat: StoryObj<HvConfusionMatrixProps> = {
  render: () => {
    const base = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const prediction = base.reduce((acc: string[], curr: string) => {
      acc.push(...Array.from(Array(base.length), () => curr));
      return acc;
    }, []);
    const expected = Array.from(
      Array(base.length * base.length),
      () => base
    ).flat();
    const matches = Array.from(Array(base.length * base.length), () =>
      Math.random().toFixed(2)
    ).flat();

    return (
      <HvConfusionMatrix
        data={{
          prediction,
          expected,
          matches,
        }}
        measure="matches"
        groupBy="prediction"
        splitBy="expected"
        format="landscape"
      />
    );
  },
};
