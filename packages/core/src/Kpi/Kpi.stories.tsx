import type { Meta, StoryObj } from "@storybook/react-vite";
import { HvKpi, HvKpiProps } from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvKpi> = {
  title: "Components/KPI",
  component: HvKpi,
  parameters: {
    a11y: {
      config: {
        rules: [
          // disable react-google-chart's labelling elements without role
          { id: "aria-allowed-attr", enabled: false },
          { id: "aria-prohibited-attr", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Main: StoryObj<HvKpiProps> = {
  args: {
    indicatorTextVariant: "title1",
    indicatorUnitTextVariant: "title2",
    labels: {
      title: "Title",
      indicator: "9.99",
      unit: "Units",
    },
  },
  argTypes: {
    trendIndicator: { control: { disable: true } },
    visualIndicator: { control: { disable: true } },
    visualComparison: { control: { disable: true } },
    labels: { control: { disable: true } },
    indicatorTextVariant: {
      control: { type: "select" },
      options: ["display", "title1", "title2"],
    },
    indicatorUnitTextVariant: {
      control: { type: "select" },
      options: ["title2", "body"],
    },
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvKpi {...args} />;
  },
};
