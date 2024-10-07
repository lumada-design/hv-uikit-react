import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvCheckBox,
  HvDropdown,
  HvDropDownMenu,
  HvOption,
  HvSelect,
  HvSelectProps,
  HvSlider,
  HvSliderProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  HvBarChart,
  HvBarChartProps,
  HvChartFilter,
  HvLineChartProps,
} from "@hitachivantara/uikit-react-viz";

import { vizDecorator } from "../../BaseChart/stories/utils";
import { CustomEchartsOptions as CustomEchartsOptionsStory } from "./CustomEchartsOptions";
import CustomEchartsOptionsRaw from "./CustomEchartsOptions?raw";
import { renderTooltip } from "./customTooltip";
import { customChartData } from "./mockData";

const meta: Meta<typeof HvBarChart> = {
  title: "Visualizations/Bar Chart",
  component: HvBarChart,
  decorators: [vizDecorator],
};
export default meta;

export const Main: StoryObj<HvBarChartProps> = {
  args: {
    stack: undefined,
    horizontal: false,
  },
  argTypes: {
    legend: { control: { disable: true } },
    data: { control: { disable: true } },
    xAxis: {
      control: { disable: true },
      description:
        "Options for the xAxis, i.e. the horizontal axis. The default `type` for this axis is `continuous` or `categorical` whether the bar chart is horizontal or not, respectively.",
    },
    yAxis: {
      control: { disable: true },
      description:
        "Options for the yAxis, i.e. the vertical axis. The default `type` for this axis is `categorical` or `continuous` whether the bar chart is horizontal or not, respectively.",
    },
    groupBy: { control: { disable: true } },
    splitBy: { control: { disable: true } },
    measures: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    seriesNameFormatter: { control: { disable: true } },
    horizontalRangeSlider: { control: { disable: true } },
    classes: { control: { disable: true } },
    grid: { control: { disable: true } },
    onEvents: { control: { disable: true } },
  },
  render: ({ data, xAxis, yAxis, groupBy, measures, ...others }) => {
    return (
      <HvBarChart
        data={{
          Month: ["January", "February", "March"],
          "Sales Target": [2300, 1000, 6700],
        }}
        groupBy="Month"
        measures="Sales Target"
        {...others}
      />
    );
  },
};

export const SingleTooltip: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Bar chart with tooltips in single line mode." },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Month: ["January", "February", "March"],
          "Sales Target": [2300, 1000, 6700],
        }}
        groupBy="Month"
        measures="Sales Target"
        tooltip={{
          type: "single",
        }}
      />
    );
  },
};

export const MultipleBarsChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple bars chart." },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={new Map<string, (string | number)[]>()
          .set("Group", ["Group 1", "Group 2", "Group 3"])
          .set("Sales Target", [2300, 1000, 7800])
          .set("Sales Per Rep", [6000, 3900, 1000])
          .set("Monthly Sales", [3700, 6700, 1100])
          .set("Target", [2100, 7700, 3000])
          .set("Cash", [500, 7600, 7800])}
        groupBy="Group"
        measures={[
          "Sales Target",
          "Sales Per Rep",
          "Monthly Sales",
          "Target",
          "Cash",
        ]}
      />
    );
  },
};

export const StackedBarChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Stacked bar charts." },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Group: ["Group 1", "Group 2", "Group 3"],
          "Sales Target": [2300, 1000, 7800],
          "Sales Per Rep": [6000, 3900, 1000],
          "Monthly Sales": [3700, 6700, 1100],
          Target: [2100, 7700, 3000],
          Cash: [500, 7600, 7800],
        }}
        groupBy="Group"
        measures={[
          "Sales Target",
          "Sales Per Rep",
          "Monthly Sales",
          "Target",
          "Cash",
        ]}
        stack="total"
      />
    );
  },
};

export const CustomStackedBarChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Stacked bar chart with a custom title and controls.",
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
      dropdownPlacement: {
        marginLeft: 10,
      },
      controllerGroup: {
        display: "flex",
        alignItems: "flex-end",
      },
    };

    const [time, setTime] = useState(1);

    const timePeriods = useMemo(
      () => [
        { value: 0, label: "Last 0.5h" },
        { value: 1, label: "Last 1.5h", selected: true },
        { value: 2, label: "Last 24h" },
        { value: 3, label: "Last 48h" },
      ],
      [],
    );

    const formatter = (value?: string | number) => `${value} Gb`;

    return (
      <>
        <div className={css(styles.wrapper)}>
          <HvTypography className={css(styles.titlePadding)} variant="title3">
            Server Status Summary
          </HvTypography>
          <div className={css(styles.controllerGroup)}>
            <HvDropdown
              label="Time Period"
              placement="left"
              classes={{
                root: css(styles.root),
                dropdown: css(styles.root),
                label: css(styles.label),
              }}
              values={timePeriods}
              onChange={(item) => setTime(item?.value || 0)}
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
        <HvBarChart
          data={customChartData[time]}
          groupBy="Category"
          measures={["Downloads", "Uploads"]}
          tooltip={{
            valueFormatter: formatter,
          }}
          yAxis={{
            labelFormatter: formatter,
          }}
          stack="Total"
        />
      </>
    );
  },
};

export const HorizontalBarChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Horizontal bar chart." },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Month: ["January", "February", "March"],
          "Sales Target": [2300, 1000, 6700],
        }}
        groupBy="Month"
        measures="Sales Target"
        horizontal
      />
    );
  },
};

export const HorizontalSingleTooltip: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Horizontal bar chart with tooltips in single line mode.",
      },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Month: ["January", "February", "March"],
          "Sales Target": [2300, 1000, 6700],
        }}
        groupBy="Month"
        measures="Sales Target"
        tooltip={{
          type: "single",
        }}
        horizontal
      />
    );
  },
};

export const MultipleHorizontalBarsChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple horizontal bars chart." },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Group: ["Group 1", "Group 2", "Group 3"],
          "Sales Target": [2300, 1000, 7800],
          "Sales Per Rep": [6000, 3900, 1000],
          "Monthly Sales": [3700, 6700, 1100],
          Target: [2100, 7700, 3000],
          Cash: [500, 7600, 7800],
        }}
        groupBy="Group"
        measures={[
          "Sales Target",
          "Sales Per Rep",
          "Monthly Sales",
          "Target",
          "Cash",
        ]}
        horizontal
      />
    );
  },
};

export const StackedHorizontalBarChart: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: { story: "Stacked horizontal bar chart." },
    },
  },
  render: () => {
    const formatter = (value?: string | number) => `${Number(value) / 1000}k`;

    return (
      <HvBarChart
        data={{
          Group: ["Group 1", "Group 2", "Group 3"],
          "Sales Target": [2300, 1000, 7800],
          "Sales Per Rep": [6000, 3900, 1000],
          "Monthly Sales": [3700, 6700, 1100],
          Target: [2100, 7700, 3000],
          Cash: [500, 7600, 7800],
        }}
        groupBy="Group"
        measures={[
          "Sales Target",
          "Sales Per Rep",
          "Monthly Sales",
          "Target",
          "Cash",
        ]}
        xAxis={{
          labelFormatter: formatter,
        }}
        tooltip={{
          valueFormatter: formatter,
        }}
        horizontal
        stack="total"
      />
    );
  },
};

export const MultipleBarsChartWithSplitBy: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Bars chart created by grouping and splitting the data using multiple columns.",
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);

    const styles = {
      checkBox: {
        paddingBottom: 20,
      },
    };

    const formatter = (value?: string | number) =>
      `${value?.toString().split("_").join(" ")}`;

    return (
      <>
        <HvCheckBox
          checked={checked}
          onChange={(_, c) => setChecked(c)}
          label="Split by country"
          className={css(styles.checkBox)}
        />
        <HvBarChart
          data={{
            Country: [
              "Portugal",
              "Portugal",
              "Spain",
              "Spain",
              "Portugal",
              "Portugal",
              "Spain",
              "Spain",
            ],
            Year: [2020, 2020, 2020, 2020, 2021, 2021, 2021, 2021],
            Semester: ["S1", "S2", "S1", "S2", "S1", "S2", "S1", "S2"],
            Precipitation: [
              591.6, 362.8, 491.6, 272.8, 534.4, 349.1, 451.6, 312.9,
            ],
          }}
          groupBy={["Year", "Semester"]}
          measures="Precipitation"
          splitBy={checked ? "Country" : undefined}
          xAxis={{
            labelFormatter: formatter,
          }}
          yAxis={{
            name: "Precipitation (mm)",
          }}
          tooltip={{
            valueFormatter: (value) => `${value} mm`,
            titleFormatter: formatter,
          }}
        />
      </>
    );
  },
};

export const PartiallyStackedChart: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Chart where only the sales for each department are stacked together and not the sales target.",
      },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Quarter: ["Q1", "Q2", "Q3", "Q4"],
          "Sales Dep 1": [2300, 9000, 8500, 1000],
          "Sales Dep 2": [6000, 2000, 1000, 2000],
          "Sales Target": [10000, 10000, 10000, 10000],
        }}
        groupBy="Quarter"
        measures={[
          { field: "Sales Dep 1", stack: "total" },
          { field: "Sales Dep 2", stack: "total" },
          { field: "Sales Target" },
        ]}
      />
    );
  },
};

export const CustomTooltip: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Chart with custom tooltip.",
      },
    },
  },
  render: () => {
    return (
      <HvBarChart
        data={{
          Metric: ["precision", "recall", "f1-score"],
          "Sales Target": [2300, 1000, 6700],
        }}
        groupBy="Metric"
        measures="Sales Target"
        tooltip={{
          component: renderTooltip,
        }}
      />
    );
  },
};

export const CustomEchartsOptions: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary, you can customize the chart's option and take advantage of the additional properties offered by ECharts. In this sample, the Y axis labels are truncated when they are too long and a tooltip is shown when hovered.",
      },
      source: { code: CustomEchartsOptionsRaw },
    },
  },
  render: () => <CustomEchartsOptionsStory />,
};

export const WithFiltering: StoryObj<HvBarChartProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates how to filter the data using the `filters` prop.",
      },
    },
  },
  render: () => {
    const data = [
      {
        label: "Portugal",
        value: 3600,
      },
      {
        label: "USA",
        value: 1500,
      },
      {
        label: "India",
        value: 6700,
      },
      {
        label: "China",
        value: 4500,
      },
      {
        label: "France",
        value: 3200,
      },
      {
        label: "UK",
        value: 2700,
      },
      {
        label: "Japan",
        value: 5800,
      },
    ];

    const [sales, setSales] = useState([0, 7000]);
    const [country, setCountry] = useState(data.map((d) => d.label));

    const handleSliderChange: HvSliderProps["onChange"] = (values) => {
      setSales(values);
    };

    const handleCountryChange: HvSelectProps<string, true>["onChange"] = (
      event,
      value,
    ) => {
      setCountry(value.length > 0 ? value : data.map((d) => d.label));
    };

    const filters: HvChartFilter[] = [
      {
        field: "Country",
        operation: "is",
        value: country,
      },
      {
        field: "Sales",
        operation: "between",
        value: [sales[0], sales[1]],
      },
    ];

    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <HvSlider
            minPointValue={0}
            maxPointValue={7000}
            values={sales}
            onChange={handleSliderChange}
            hideInput
            label="Sales"
            style={{ width: 400 }}
          />
          <HvSelect
            multiple
            name="countries"
            label="Country"
            placeholder="Select countries"
            onChange={handleCountryChange}
            style={{ width: 300 }}
          >
            {data.map(({ value, label }) => (
              <HvOption key={value} value={label} label={label}>
                {`${label}`}
              </HvOption>
            ))}
          </HvSelect>
        </div>
        <HvBarChart
          data={{
            Country: data.map((item) => item.label),
            Sales: data.map((item) => item.value),
          }}
          groupBy="Country"
          measures="Sales"
          filters={filters}
        />
      </>
    );
  },
};
