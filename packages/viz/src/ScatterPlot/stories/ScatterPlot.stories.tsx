import { Meta, StoryObj } from "@storybook/react";
import {
  HvScatterPlot,
  HvScatterPlotProps,
} from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../../BaseChart/stories/utils";
import { CustomEchartsOptions as CustomEchartsOptionsStory } from "./CustomEchartsOptions";
import CustomEchartsOptionsRaw from "./CustomEchartsOptions?raw";
import { HorizontalRangeSlider as HorizontalRangeSliderStory } from "./HorizontalRangeSlider";
import HorizontalRangeSliderRaw from "./HorizontalRangeSlider?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { MultiplePlotsWithSplitBy as MultiplePlotsWithSplitByStory } from "./MultiplePlotsWithSplitBy";
import MultiplePlotsWithSplitByRaw from "./MultiplePlotsWithSplitBy?raw";
import { MultipleYAxes as MultipleYAxesStory } from "./MultipleYAxes";
import MultipleYAxesRaw from "./MultipleYAxes?raw";

const meta: Meta<typeof HvScatterPlot> = {
  title: "Visualizations/Scatter Plot",
  component: HvScatterPlot,
  decorators: [vizDecorator],
};
export default meta;

export const Main: StoryObj<HvScatterPlotProps> = {
  argTypes: {
    legend: { control: { disable: true } },
    data: { control: { disable: true } },
    xAxis: {
      control: { disable: true },
      description:
        "Options for the xAxis, i.e. the horizontal axis. The default `type` for this axis is `continuous`.",
    },
    yAxis: {
      control: { disable: true },
      description:
        "Options for the yAxis, i.e. the vertical axis. The default `type` for this axis is `continuous`.",
    },
    groupBy: { control: { disable: true } },
    splitBy: { control: { disable: true } },
    measures: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    seriesNameFormatter: { control: { disable: true } },
    horizontalRangeSlider: { control: { disable: true } },
    classes: { control: { disable: true } },
    grid: { control: { disable: true } },
    onEvents: { control: { disable: true } },
  },
  parameters: { docs: { source: { code: MainRaw } } },
  render: (args) => <MainStory {...args} />,
};

export const MultiplePlotsWithSplitBy: StoryObj<HvScatterPlotProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple scatter plots created by splitting the data.",
      },
      source: { code: MultiplePlotsWithSplitByRaw },
    },
  },
  render: () => <MultiplePlotsWithSplitByStory />,
};

export const MultipleYAxes: StoryObj<HvScatterPlotProps> = {
  parameters: {
    docs: {
      description: {
        story: "Scatter plot with multiple y axes.",
      },
      source: { code: MultipleYAxesRaw },
    },
  },
  render: () => <MultipleYAxesStory />,
};

export const HorizontalRangeSlider: StoryObj<HvScatterPlotProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot with a range slider to zoom the data along the x axis",
      },
      source: { code: HorizontalRangeSliderRaw },
    },
  },
  render: () => <HorizontalRangeSliderStory />,
};

export const CustomEchartsOptions: StoryObj<HvScatterPlotProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary, you can customize the chart's option and take advantage of the additional properties offered by ECharts.",
      },
      source: { code: CustomEchartsOptionsRaw },
    },
  },
  render: () => <CustomEchartsOptionsStory />,
};
