import { Meta, StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvDashboard,
  HvDashboardProps,
  HvDashboardItem,
} from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvDashboard> = {
  title: "Lab/Dashboard",
  component: HvDashboard,
};

export default meta;

interface Item extends HvDashboardItem {
  type: "txt";
  label: string;
}

const items = ["1", "2", "3"].map<Item>((id) => ({
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
        items={items}
        layout={[
          { i: "1", x: 0, y: 0, w: 6, h: 2, isDraggable: false },
          { i: "2", x: 6, y: 0, w: 4, h: 1, isResizable: false },
          { i: "3", x: 6, y: 1, w: 2, h: 1 },
        ]}
        renderItem={(item) => (
          <div
            className={css({
              width: "100%",
              backgroundColor: theme.colors.atmo1,
              padding: theme.space.sm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            {item.label}
          </div>
        )}
      />
    );
  },
};
