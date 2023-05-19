import {
  theme,
  HvDropDownMenu,
  HvDropdown,
  HvListValue,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { HvLineChart, HvLineChartProps } from "./LineChart";
import { chartData } from "./data";

const meta: Meta<typeof HvLineChart> = {
  title: "Visualizations/Line Chart",
  component: HvLineChart,
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

export const Main: StoryObj<HvLineChartProps> = {
  argTypes: {
    data: { control: { disable: true } },
    dimensions: { control: { disable: true } },
    xAxis: { control: { disable: true } },
    yAxis: { control: { disable: true } },
    series: { control: { disable: true } },
    tooltip: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvLineChart
        dimensions={["month", "Sales Target"]}
        data={[
          ["January", 5929],
          ["February", 2393],
          ["March", 1590],
          ["April", 7817],
          ["May", 4749],
          ["June", 1702],
          ["July", 2381],
          ["August", 2909],
          ["September", 6732],
          ["October", 3098],
          ["November", 2119],
          ["December", 2146],
        ]}
        xAxis={{ dimension: "month", labelRotation: 45 }}
        series={[{ dimension: "Sales Target" }]}
      />
    );
  },
};

export const WithArea: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Colors the area below it." },
    },
  },
  render: () => {
    return (
      <HvLineChart
        data={[
          { month: "January", "Sales Target": 5929 },
          { month: "February", "Sales Target": 2393 },
          { month: "March", "Sales Target": 1590 },
          { month: "April", "Sales Target": 7817 },
          { month: "May", "Sales Target": 4749 },
          { month: "June", "Sales Target": 1702 },
          { month: "July", "Sales Target": 2381 },
          { month: "August", "Sales Target": 2909 },
          { month: "September", "Sales Target": 6732 },
          { month: "October", "Sales Target": 3098 },
          { month: "November", "Sales Target": 2119 },
          { month: "December", "Sales Target": 2146 },
        ]}
        xAxis={{ dimension: "month", labelRotation: 45 }}
        series={[{ dimension: "Sales Target" }]}
        type="area"
      />
    );
  },
};

export const MultipleLineCharts: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple line charts" },
    },
  },
  render: () => {
    return (
      <HvLineChart
        dimensions={["month", "Sales Target", "Sales Per Rep", "Monthly Sales"]}
        data={[
          ["January", 3400, 3022, 3900],
          ["February", 5929, 3005, 4971],
          ["March", 1803, 2517, 2694],
          ["April", 6470, 8397, 2177],
          ["May", 6853, 6587, 7756],
          ["June", 7517, 6648, 1717],
          ["July", 5636, 8067, 3308],
          ["August", 4280, 2723, 2200],
          ["September", 7238, 7523, 2294],
          ["October", 6889, 7853, 1771],
          ["November", 8268, 4819, 2324],
          ["December", 2751, 3820, 6705],
        ]}
        xAxis={{ dimension: "month", labelRotation: 45 }}
        series={[
          { dimension: "Sales Target" },
          { dimension: "Sales Per Rep" },
          { dimension: "Monthly Sales" },
        ]}
      />
    );
  },
};

export const MultipleAreaCharts: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple area charts" },
    },
  },
  render: () => {
    return (
      <HvLineChart
        data={{
          group: ["Group 1", "Group 2", "Group 3"],
          Target: [9000, 8500, 8700],
          Cash: [7000, 8000, 6500],
          "Monthly Sales": [3700, 7500, 1100],
          "Sales Per Rep": [3000, 3900, 1000],
          "Sales Target": [2300, 1000, 400],
        }}
        xAxis={{ dimension: "group" }}
        series={[
          { dimension: "Target" },
          { dimension: "Cash" },
          { dimension: "Monthly Sales" },
          { dimension: "Sales Per Rep" },
          { dimension: "Sales Target" },
        ]}
        type="area"
      />
    );
  },
};

export const CustomMultipleLineCharts: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple line charts with a custom title and controls.",
      },
    },
  },
  render: () => {
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

    const [country, setCountry] = useState("portugal");
    const [time, setTime] = useState(0);

    const countries = useMemo(
      () => [
        { value: "portugal", label: "Portugal", selected: true },
        { value: "spain", label: "Spain" },
      ],
      []
    );

    const timePeriods = useMemo(
      () => [
        { value: 0, label: "Last 0.5h", selected: true },
        { value: 1, label: "Last 1.5h" },
      ],
      []
    );

    return (
      <>
        <div className={css(styles.wrapper)}>
          <HvTypography className={css(styles.titlePadding)} variant="title3">
            Server Status Summary
          </HvTypography>
          <div className={css(styles.controllerGroup)}>
            <HvDropdown
              className={css(styles.selectorPadding)}
              id="dropdown1"
              classes={{
                root: css(styles.root),
                dropdown: css(styles.root),
                label: css(styles.label),
              }}
              aria-label="Country"
              values={countries}
              placement="left"
              onChange={(item) => setCountry((item as HvListValue).value)}
            />
            <HvDropdown
              id="dropdown2"
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
        <HvLineChart
          data={chartData[country][time]}
          xAxis={{ dimension: "time" }}
          series={[
            { dimension: "Input Feed Rate" },
            { dimension: "Output Feed" },
            { dimension: "Availability" },
          ]}
        />
      </>
    );
  },
};
