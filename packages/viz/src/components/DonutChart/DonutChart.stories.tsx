import { theme } from "@hitachivantara/uikit-react-core";
import { Meta, StoryObj } from "@storybook/react";
import { HvDonutChart, HvDonutChartProps } from "./DonutChart";

const meta: Meta<typeof HvDonutChart> = {
  title: "Visualizations/Donut Chart",
  component: HvDonutChart,
  parameters: { eyes: { include: false } },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: theme.colors.atmo1,
          padding: 20,
        }}
      >
        {Story()}
      </div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvDonutChartProps> = {
  render: () => {
    return (
      <HvDonutChart
        data={{
          Type: ["Uploads", "Downloads"],
          Music: [250, 800],
        }}
        groupBy="Type"
        measure="Music"
      />
    );
  },
};
