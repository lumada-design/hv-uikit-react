import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import {
  HvBarChart,
  HvLineChart,
  HvDonutChart,
} from "@hitachivantara/uikit-react-viz";
import { HvDashboard, HvDashboardProps } from "@hitachivantara/uikit-react-lab";
import {
  HvButton,
  HvSection,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Tool } from "@hitachivantara/uikit-react-icons";

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

const itemIds = ["bar", "line", "donut", "bar"] as const;

const dataDrivenItems = itemIds.map((type, i) => ({
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

const componentMap: Record<(typeof itemIds)[number], any> = {
  bar: HvBarChart,
  line: HvLineChart,
  donut: HvDonutChart,
};

export const DataDriven: StoryObj<HvDashboardProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates how to construct a dashboard from an array of data elements, where each item holds a `type` of dashboard item to render.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [canDrag, setCanDrag] = useState(false);
    const [canResize, setCanResize] = useState(true);

    return (
      <>
        <HvButton
          variant="secondaryGhost"
          startIcon={<Tool />}
          onClick={() => setCanDrag((prev) => !prev)}
        >
          {`Drag is ${canDrag ? "enabled" : "disabled"}`}
        </HvButton>
        <HvButton
          variant="secondaryGhost"
          startIcon={<Tool />}
          onClick={() => setCanResize((prev) => !prev)}
        >
          {`Resize is ${canResize ? "enabled" : "disabled"}`}
        </HvButton>
        <br />
        <HvDashboard
          margin={[16, 16]}
          isDraggable={canDrag}
          isResizable={canResize}
          layout={dataDrivenItems.map(({ id }, i) => ({
            i: id,
            x: (i % 2) * (12 / 2),
            y: i * 4,
            w: 12 / 2,
            h: 3,
          }))}
        >
          {dataDrivenItems.map((item) => {
            const { id, type, ...props } = item;
            const Component = componentMap[type];

            if (!Component) {
              return <div>❌ Cannot render {type} dashboard item</div>;
            }

            return (
              <div key={item.id} className={css({ display: "flex" })}>
                <HvSection
                  classes={{ content: css({ height: "100%" }) }}
                  title={
                    <HvTypography
                      variant="title3"
                      className={css({ textTransform: "capitalize" })}
                    >{`${item.type} chart`}</HvTypography>
                  }
                >
                  <Component {...props} />
                </HvSection>
              </div>
            );
          })}
        </HvDashboard>
      </>
    );
  },
};
