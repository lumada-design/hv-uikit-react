import { Meta, StoryObj } from "@storybook/react";
import {
  HvTreemapChart,
  HvTreemapChartProps,
} from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../../BaseChart/stories/utils";
import { CustomTooltip as CustomTooltipStory } from "./CustomTooltip";
import CustomTooltipRaw from "./CustomTooltip?raw";
import { data as testData } from "./data";

const meta: Meta<typeof HvTreemapChart> = {
  title: "Visualizations/Treemap Chart",
  component: HvTreemapChart,
  decorators: [vizDecorator],
};
export default meta;

export const Main: StoryObj<HvTreemapChartProps> = {
  args: {},
  argTypes: {
    data: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ data, ...others }) => {
    return (
      <HvTreemapChart name="Public Spending" data={testData} {...others} />
    );
  },
};

export const CustomTooltip: StoryObj<HvTreemapChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates how to change the default tooltip to a custom one.",
      },
      source: { code: CustomTooltipRaw },
    },
  },
  render: () => <CustomTooltipStory />,
};

export const CustomEchartsOptions: StoryObj<HvTreemapChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary, you can customize the chart's option and take advantage of the additional properties offered by ECharts. In this sample we change some of the visual styles of the Treemap",
      },
    },
  },
  render: ({ data, ...others }) => {
    return (
      <HvTreemapChart
        name="Public Spending"
        data={testData}
        onOptionChange={(option) => {
          option.series = {
            ...option.series[0],
            visibleMin: 1000,
            upperLabel: {
              show: true,
              height: 20,
            },
            levels: [
              {
                itemStyle: {
                  borderColor: "#777",
                  borderWidth: 0,
                  gapWidth: 1,
                },
                upperLabel: {
                  show: false,
                },
              },
              {
                itemStyle: {
                  borderColor: "#555",
                  borderWidth: 5,
                  gapWidth: 1,
                },
                emphasis: {
                  itemStyle: {
                    borderColor: "#ddd",
                  },
                },
              },
              {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                  borderWidth: 5,
                  gapWidth: 1,
                  borderColorSaturation: 0.6,
                },
              },
            ],
          };
          return option;
        }}
        {...others}
      />
    );
  },
};
