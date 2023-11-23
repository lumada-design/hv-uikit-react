import { Meta, StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvBarChart,
  HvLineChart,
  HvDonutChart,
  HvChartData,
  HvConfusionMatrix,
} from "@hitachivantara/uikit-react-viz";
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

const items = ["1", "2", "3", "4"].map<Item>((id) => ({
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
          { i: "3", x: 6, y: 1, w: 2, h: 1, resizeHandles: ["e", "w"] },
          { i: "4", x: 10, y: 0, w: 2, h: 1, static: true },
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

const itemIds = ["bar", "line", "conf", "donut", "bar", "txt", "null"] as const;

interface ItemType extends HvDashboardItem {
  type: (typeof itemIds)[number];
  data: HvChartData;
}

const dataDrivenItems = itemIds.map<ItemType>((type, i) => ({
  id: `${type}-${i}`,
  type,
  data: new Map<string, (string | number)[]>()
    .set("Group", ["Group 1", "Group 2", "Group 3"])
    .set("Sales Target", [2300, 1000, 7800])
    .set("Sales Per Rep", [6000, 3900, 1000])
    .set("Monthly Sales", [3700, 6700, 1100])
    .set("Target", [2100, 7700, 3000])
    .set("Cash", [500, 7600, 7800]),
  groupBy: "Group",
  measures: ["Sales Target", "Sales Per Rep", "Monthly Sales", "Target"],
  measure: "Sales Target",
}));

const TxtRenderer = ({ data }) => (
  <pre className={css({ width: "100%", overflow: "auto", textWrap: "wrap" })}>
    <code>{JSON.stringify(Object.fromEntries(data))}</code>
  </pre>
);

export const DataDriven: StoryObj<HvDashboardProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvDashboard
        items={dataDrivenItems}
        layout={dataDrivenItems.map(({ id }, i) => ({
          i: id,
          x: (i % 2) * (12 / 2),
          y: i * 4,
          w: 12 / 2,
          h: 3,
          isDraggable: false,
        }))}
        renderItem={(item) => {
          const { id, type, ...props } = item;
          const componentMap: Record<typeof type, any> = {
            bar: HvBarChart,
            line: HvLineChart,
            donut: HvDonutChart,
            conf: HvConfusionMatrix,
            txt: TxtRenderer,
            null: null,
          };

          const Component = componentMap[type];

          if (!Component) {
            return <div>❌ Cannot render {type} dashboard item</div>;
          }

          return <Component {...props} />;
        }}
      />
    );
  },
};
