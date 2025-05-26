import type { Meta, StoryObj } from "@storybook/react-vite";
import { HvHeatmap, HvHeatmapProps } from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../../BaseChart/stories/utils";
import { bigData } from "./bigData";
import { CustomTooltip as CustomTooltipStory } from "./CustomTooltip";
import CustomTooltipRaw from "./CustomTooltip?raw";
import { data as customData, days, hours } from "./data";

const meta: Meta<typeof HvHeatmap> = {
  title: "Visualizations/Heatmap",
  component: HvHeatmap,
  decorators: [vizDecorator],
  tags: ["skipTestRunner"],
};
export default meta;

export const Main: StoryObj<HvHeatmapProps> = {
  args: {
    min: 0,
    max: 12,
    colorScale: ["#2D4B87", "#E7EDF9"],
  },
  argTypes: {
    data: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ ...args }) => {
    return (
      <HvHeatmap
        name="My Heatmap"
        data={customData}
        xAxis={{ data: hours }}
        yAxis={{ data: days }}
        {...args}
      />
    );
  },
};

export const CustomTooltip: StoryObj<HvHeatmapProps> = {
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

export const OverImage: StoryObj<HvHeatmapProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates how to overlay a heat map with a lot of data over an image.",
      },
      source: { code: CustomTooltipRaw },
    },
  },
  render: () => {
    const colors = [
      "transparent",
      "transparent",
      "transparent",
      "#FFFFCC11",
      "#FFFFCC77",
      "#FFFFCCAA",
      "#FFFF6677",
      "#FFFF66AA",
      "#FFFF66DD",
      "#FF9900AA",
      "#FF7700DD",
    ];
    return (
      <div style={{ width: 640, height: 655 }}>
        <img
          src="https://t3.ftcdn.net/jpg/02/14/23/42/360_F_214234265_cw9c9yW4X04SNhoRyel1Kf9ZTEiqfKz7.jpg"
          width="650"
          height="480"
          alt="pitch"
          style={{ position: "absolute", top: "33px", left: "33px" }}
        />
        <HvHeatmap
          name="Match Statistics"
          data={bigData}
          xAxis={{ data: [] }}
          yAxis={{ data: [] }}
          min={0}
          max={1}
          colorScale={colors}
          onOptionChange={(option) => {
            option.series = {
              ...option.series[0],
              label: {
                show: false,
              },
              itemStyle: {
                borderWidth: 0,
              },
            };
            option.visualMap = {
              ...option.visualMap,
              realtime: false,
            };
            return option;
          }}
          tooltip={{
            show: false,
          }}
          width={636}
          height={476}
        />
      </div>
    );
  },
};
