import type { Meta, StoryObj } from "@storybook/react-vite";
import { loadArrow } from "arquero";
import { HvBoxplot, HvBoxplotProps } from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../../BaseChart/stories/utils";
import { CustomTooltip as CustomTooltipStory } from "./CustomTooltip";
import CustomTooltipRaw from "./CustomTooltip?raw";

const meta: Meta<typeof HvBoxplot> = {
  title: "Visualizations/Boxplot",
  component: HvBoxplot,
  decorators: [vizDecorator],
  tags: ["skipTestRunner"],
};
export default meta;

export const Main: StoryObj<HvBoxplotProps> = {
  args: {
    groupBy: "Territory",
    measures: ["Sales"],
  },
  argTypes: {
    tooltip: { control: { disable: true } },
    classes: { control: { disable: true } },
    groupBy: {
      control: { type: "select" },
      options: ["Territory", "Country", "State Province", "City"],
    },
  },
  loaders: [
    async () => ({
      // @ts-ignore
      data: await loadArrow(
        "https://lumada-design.github.io/assets/steelwheels.arrow",
      ),
    }),
  ],
  render: ({ groupBy, measures }, { loaded: { data } }) => {
    return (
      <HvBoxplot
        name="Steel Wheels"
        data={data}
        groupBy={groupBy}
        measures={measures}
      />
    );
  },
};

export const CustomTooltip: StoryObj<HvBoxplotProps> = {
  loaders: [
    async () => ({
      // @ts-ignore
      data: await loadArrow(
        "https://lumada-design.github.io/assets/steelwheels.arrow",
      ),
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates how to change the default tooltip to a custom one.",
      },
      source: { code: CustomTooltipRaw },
    },
  },
  render: (args, { loaded: { data } }) => <CustomTooltipStory data={data} />,
};

export const MultipleYAxes: StoryObj<HvBoxplotProps> = {
  loaders: [
    async () => ({
      // @ts-ignore
      data: await loadArrow(
        "https://lumada-design.github.io/assets/steelwheels.arrow",
      ),
    }),
  ],
  render: (args, { loaded: { data } }) => {
    return (
      <HvBoxplot
        name="Steel Wheels"
        data={data}
        groupBy="Territory"
        yAxis={[
          {
            id: "credit",
            name: "Credit Limit",
          },
          {
            id: "sal",
            name: "Sales",
          },
        ]}
        measures={[
          {
            field: "Credit Limit",
            yAxis: "credit",
          },
          {
            field: "Sales",
            yAxis: "sal",
          },
        ]}
      />
    );
  },
};
