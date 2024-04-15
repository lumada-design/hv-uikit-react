import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvCheckBox,
  HvDropdown,
  HvDropDownMenu,
  HvListValue,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Ticket } from "@hitachivantara/uikit-react-icons"; // eslint-disable-line
import {
  HvDonutChart,
  HvDonutChartProps,
} from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../BaseChart/stories/utils";

const meta: Meta<typeof HvDonutChart> = {
  title: "Visualizations/Donut Chart",
  component: HvDonutChart,
  decorators: [vizDecorator],
};
export default meta;

export const Main: StoryObj<HvDonutChartProps> = {
  args: {
    type: "regular",
  },
  argTypes: {
    measure: { control: { disable: true } },
    slicesNameFormatter: { control: { disable: true } },
    data: { control: { disable: true } },
    groupBy: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    legend: { control: { disable: true } },
    grid: { control: { disable: true } },
    classes: { control: { disable: true } },
    onEvents: { control: { disable: true } },
  },
  render: ({ data, groupBy, measure, ...others }) => {
    return (
      <HvDonutChart
        data={{
          Type: ["Uploads", "Downloads"],
          Music: [250, 800],
        }}
        groupBy="Type"
        measure="Music"
        {...others}
      />
    );
  },
};

export const Thin: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Thin donut chart.",
      },
    },
  },
  render: () => {
    return (
      <HvDonutChart
        data={{
          Type: ["Uploads", "Downloads"],
          Music: [540, 1234],
        }}
        groupBy="Type"
        measure="Music"
        type="thin"
      />
    );
  },
};

export const Legend: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Donut chart with the legend on the right.",
      },
    },
  },
  render: () => {
    return (
      <HvDonutChart
        data={{
          Category: [
            "Total Sales",
            "Sales Per Rep",
            "Monthly Sales",
            "Target",
            "Inventory",
            "Available",
          ],
          Total: [61239, 26829, 71902, 65000, 18290, 72829],
        }}
        groupBy="Category"
        measure={{ field: "Total", valueFormatter: (v) => `${v} €` }}
        legend={{
          direction: "vertical",
          position: {
            y: "center",
            x: "right",
          },
        }}
      />
    );
  },
};

export const Total: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Donut chart with the total in the center.",
      },
    },
  },
  render: () => {
    const classes = {
      root: css({ position: "relative", height: "100%" }),
      content: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }),
    };

    const data = {
      Country: ["Portugal", "Spain", "France", "Germany"],
      "Tickets Sold": [61829, 123948, 253792, 524638],
    };

    return (
      <div className={classes.root}>
        <HvDonutChart data={data} groupBy="Country" measure="Tickets Sold" />
        <div className={classes.content}>
          <Ticket iconSize="M" />
          <HvTypography variant="title3">
            {data["Tickets Sold"].reduce((acc, value) => acc + value, 0)}
          </HvTypography>
        </div>
      </div>
    );
  },
};

export const WithControls: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Donut chart with title and controls.",
      },
    },
  },
  render: () => {
    const [time, setTime] = useState(0);

    const styles = {
      wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 20,
      },
      root: {
        width: 250,
      },
      label: { paddingBottom: 6 },
      titlePadding: { marginTop: 10 },
      selectorPadding: {
        marginRight: 20,
      },
      dropdownPlacement: {
        marginLeft: 10,
      },
      controllerGroup: {
        display: "flex",
        alignItems: "flex-end",
      },
    };

    const timePeriods = useMemo(
      () => [
        { value: 0, label: "Last 24h", selected: true },
        { value: 1, label: "Last 48h" },
      ],
      [],
    );

    const data = [
      { Type: ["Uploads", "Downloads"], Music: [540, 1234] },
      { Type: ["Uploads", "Downloads"], Music: [840, 4234] },
    ];

    return (
      <>
        <div className={css(styles.wrapper)}>
          <HvTypography className={css(styles.titlePadding)} variant="title3">
            Server Status Summary
          </HvTypography>
          <div className={css(styles.controllerGroup)}>
            <HvDropdown
              aria-label="Time Period"
              placement="left"
              classes={{
                root: css(styles.root),
                dropdown: css(styles.root),
                label: css(styles.label),
              }}
              values={timePeriods}
              onChange={(item) => setTime((item as HvListValue).value)}
            />
            <HvDropDownMenu
              className={css(styles.dropdownPlacement)}
              dataList={[
                { label: "Label 1" },
                { label: "Label 2" },
                { label: "Label 3" },
              ]}
              placement="left"
            />
          </div>
        </div>
        <HvDonutChart data={data[time]} groupBy="Type" measure="Music" />
      </>
    );
  },
};

export const WithMultipleTransformations: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with multiple transformations: group by and sort by.",
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);

    const precFormatter = (value?: string | number) => `${value} mm`;

    const nameFormatter = (value?: string) => `${value?.split("_").join(" ")}`;

    const styles = {
      checkBox: {
        paddingBottom: 20,
      },
    };

    return (
      <>
        <HvCheckBox
          checked={checked}
          onChange={(_, c) => setChecked(c)}
          label="Split by semester"
          className={css(styles.checkBox)}
        />
        <HvDonutChart
          data={{
            Year: ["2021", "2022", "2020", "2020", "2021", "2022"],
            Semester: ["S1", "S1", "S1", "S2", "S2", "S2"],
            Precipitation: [212.6, 115.9, 219.0, 226.0, 128.2, 170.7],
          }}
          groupBy={checked ? ["Year", "Semester"] : "Year"}
          measure="Precipitation"
          sortBy={{ field: "Year", order: "asc" }}
          tooltip={{
            valueFormatter: precFormatter,
          }}
          slicesNameFormatter={nameFormatter}
        />
      </>
    );
  },
};

export const CustomEchartsOptions: StoryObj<HvDonutChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary, you can customize the chart's option and take advantage of the additional properties offered by ECharts.",
      },
    },
  },
  render: () => {
    return (
      <HvDonutChart
        data={{
          Type: ["Uploads", "Downloads"],
          Music: [540, 1234],
        }}
        groupBy="Type"
        measure="Music"
        type="thin"
        onOptionChange={(option) => {
          if (
            option.legend &&
            typeof option.legend === "object" &&
            !Array.isArray(option.legend)
          ) {
            option.legend.icon = "circle";
          }

          return option;
        }}
      />
    );
  },
};
