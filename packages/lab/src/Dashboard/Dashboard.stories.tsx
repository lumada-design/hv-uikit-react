import type { Meta, StoryObj } from "@storybook/react-vite";
import { HvSection, HvTypography } from "@hitachivantara/uikit-react-core";
import { HvDashboard, HvDashboardProps } from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvDashboard> = {
  title: "Lab/Dashboard",
  component: HvDashboard,
};

export default meta;

const items = ["1", "2", "3", "4"].map((id) => ({
  id,
  type: "txt",
  label: `Item ${id}`,
}));

export const Main: StoryObj<HvDashboardProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvDashboard
        layout={[
          { i: "1", x: 0, y: 0, w: 6, h: 2, isDraggable: false },
          { i: "2", x: 6, y: 0, w: 4, h: 1, isResizable: false },
          { i: "3", x: 6, y: 1, w: 2, h: 1, resizeHandles: ["e", "w"] },
          { i: "4", x: 10, y: 0, w: 2, h: 1, static: true },
        ]}
      >
        {items.map((item) => (
          <HvSection
            key={item.id}
            title={<HvTypography variant="title3">{item.label}</HvTypography>}
          />
        ))}
      </HvDashboard>
    );
  },
};
