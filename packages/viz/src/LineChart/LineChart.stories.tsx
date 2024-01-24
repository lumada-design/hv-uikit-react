import { useEffect, useMemo, useRef, useState } from "react";
import {
  HvDropDownMenu,
  HvDropdown,
  HvListValue,
  HvTypography,
  HvCheckBox,
  Random,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { loadArrow } from "arquero";

import { emptyCellMode } from "../types/generic";

import { vizDecorator } from "../BaseChart/stories/utils";
import { HvLineChart, HvLineChartProps } from "./LineChart";
import { chartData } from "./mockData";

const meta: Meta<typeof HvLineChart> = {
  title: "Visualizations/Line Chart",
  component: HvLineChart,
  parameters: { eyes: { include: false } },
  decorators: [vizDecorator],
};
export default meta;

export const Main: StoryObj<HvLineChartProps> = {
  args: {
    area: false,
    stack: undefined,
    emptyCellMode: "connect",
    areaOpacity: 0.5,
  },
  argTypes: {
    legend: { control: { disable: true } },
    data: { control: { disable: true } },
    xAxis: {
      control: { disable: true },
      description:
        "Options for the xAxis, i.e. the horizontal axis. The default `type` for this axis is `categorical`.",
    },
    yAxis: {
      control: { disable: true },
      description:
        "Options for the yAxis, i.e. the vertical axis. The default `type` for this axis is `continuous`.",
    },
    groupBy: { control: { disable: true } },
    splitBy: { control: { disable: true } },
    measures: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    seriesNameFormatter: { control: { disable: true } },
    horizontalRangeSlider: { control: { disable: true } },
    emptyCellMode: {
      control: { type: "radio" },
      options: emptyCellMode,
    },
    classes: { control: { disable: true } },
    grid: { control: { disable: true } },
  },
  render: ({ data, groupBy, measures, ...others }) => {
    return (
      <HvLineChart
        data={{
          Month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          "Sales Target": [
            5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119,
            2146,
          ],
        }}
        groupBy="Month"
        measures="Sales Target"
        {...others}
      />
    );
  },
};

export const WithArea: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Colors the area below the chart." },
    },
  },
  render: () => {
    return (
      <HvLineChart
        data={new Map<string, (string | number)[]>()
          .set("Month", [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ])
          .set(
            "Sales Target",
            [
              5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119,
              2146,
            ]
          )}
        groupBy="Month"
        measures="Sales Target"
        area
      />
    );
  },
};

export const MultipleLinesChart: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple lines chart." },
    },
  },
  render: () => {
    return (
      <HvLineChart
        data={[
          {
            Month: "January",
            "Sales Target": 3400,
            "Sales Per Rep": 3022,
            "Monthly Sales": 3900,
          },
          {
            Month: "February",
            "Sales Target": 5929,
            "Sales Per Rep": 3005,
            "Monthly Sales": 4971,
          },
          {
            Month: "March",
            "Sales Target": 1803,
            "Sales Per Rep": 2517,
            "Monthly Sales": 2694,
          },
          {
            Month: "April",
            "Sales Target": 6470,
            "Sales Per Rep": 8397,
            "Monthly Sales": 2177,
          },
          {
            Month: "May",
            "Sales Target": 6853,
            "Sales Per Rep": 6587,
            "Monthly Sales": 7756,
          },
          {
            Month: "June",
            "Sales Target": 7517,
            "Sales Per Rep": 6648,
            "Monthly Sales": 1717,
          },
          {
            Month: "July",
            "Sales Target": 5636,
            "Sales Per Rep": 8067,
            "Monthly Sales": 3308,
          },
          {
            Month: "August",
            "Sales Target": 4280,
            "Sales Per Rep": 2723,
            "Monthly Sales": 2200,
          },
          {
            Month: "September",
            "Sales Target": 7238,
            "Sales Per Rep": 7523,
            "Monthly Sales": 2294,
          },
          {
            Month: "October",
            "Sales Target": 6889,
            "Sales Per Rep": 7853,
            "Monthly Sales": 1771,
          },
          {
            Month: "November",
            "Sales Target": 8268,
            "Sales Per Rep": 4819,
            "Monthly Sales": 2324,
          },
          {
            Month: "December",
            "Sales Target": 2751,
            "Sales Per Rep": 3820,
            "Monthly Sales": 6705,
          },
        ]}
        groupBy="Month"
        measures={["Sales Target", "Sales Per Rep", "Monthly Sales"]}
      />
    );
  },
};

export const CustomMultipleLinesChart: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple lines chart with a custom title and controls.",
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
          groupBy="time"
          measures={["Input Feed Rate", "Output Feed", "Availability"]}
        />
      </>
    );
  },
};

export const MultipleLinesChartWithSplitBy: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple lines chart created by splitting the data.",
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

    return (
      <>
        <HvCheckBox
          checked={checked}
          onChange={(_, c) => setChecked(c)}
          label={checked ? "Split by country" : "Split by country and medal"}
          className={css(styles.checkBox)}
        />
        <HvLineChart
          data={{
            Country: [
              "Portugal",
              "Portugal",
              "Spain",
              "Spain",
              "USA",
              "USA",
              "Canada",
              "Canada",
              "Portugal",
              "Portugal",
              "Spain",
              "Spain",
              "USA",
              "USA",
              "Canada",
              "Canada",
              "Portugal",
              "Portugal",
              "Spain",
              "Spain",
              "USA",
              "USA",
              "Canada",
              "Canada",
            ],
            Year: [
              2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2019, 2019, 2019,
              2019, 2019, 2019, 2019, 2019, 2020, 2020, 2020, 2020, 2020, 2020,
              2020, 2020,
            ],
            Medal: [
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
              "gold",
              "silver",
            ],
            Total: [
              3, 2, 1, 0, 4, 11, 8, 3, 2, 9, 0, 5, 3, 6, 2, 1, 7, 5, 6, 9, 2, 5,
              6, 7,
            ],
          }}
          groupBy="Year"
          measures="Total"
          splitBy={checked ? ["Country", "Medal"] : "Country"}
          seriesNameFormatter={(s) => `${s?.split("_").join(" ")}`}
        />
      </>
    );
  },
};

export const StackedAreaChart: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Stacked chart with colored areas." },
    },
  },
  render: () => {
    const formatter = (value?: number | string) => `${Number(value) / 1000}k`;

    return (
      <HvLineChart
        data={{
          Group: ["Group 1", "Group 2", "Group 3"],
          "Sales Target": [2300, 1000, 8500],
          "Sales Per Rep": [6000, 1000, 1000],
          "Monthly Sales": [3700, 7500, 1100],
          Target: [2100, 8500, 3000],
          Cash: [500, 8000, 9500],
        }}
        groupBy="Group"
        measures={[
          "Sales Target",
          "Sales Per Rep",
          "Monthly Sales",
          "Target",
          "Cash",
        ]}
        yAxis={{
          labelFormatter: formatter,
        }}
        tooltip={{ valueFormatter: formatter }}
        area
        stack="total"
      />
    );
  },
};

export const HorizontalRangeSlider: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Chart with a range slider to zoom the data along the x axis.",
      },
    },
  },
  render: () => {
    const r = new Random();
    const rand = (diff) => r.next() * diff - diff / 2;

    const generateDates = (num = 100, startDate = new Date(2020, 0)) =>
      Array.from(Array(num).keys()).map((i) =>
        new Date(new Date(startDate).setDate(startDate.getDate() + i))
          .toISOString()
          .slice(0, 10)
      );

    const generateValues = (num = 10, start = 100, inc = 1) => {
      const values = [start];
      for (let i = 0; i <= num; i += 1) {
        values.push(values[i] + rand(inc));
      }
      return values;
    };

    const dates = generateDates(200, new Date(2015, 1, 17));
    const values = generateValues(dates.length, 200, 8);

    const data = {
      Date: dates,
      "Sales Target": values,
      "Sales Volume": values.map((v) => v + rand(8)),
    };

    return (
      <HvLineChart
        data={data}
        groupBy="Date"
        measures={["Sales Target", "Sales Volume"]}
        horizontalRangeSlider={{ show: true }}
      />
    );
  },
};

export const WithIntervalUpdates: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Data updated each second." },
    },
  },
  render: () => {
    const r = new Random();
    const rand = (diff) => r.next() * diff - diff / 2;

    const generateDates = (initialDate, num = 200) =>
      Array.from(Array(num).keys()).map((i) =>
        new Date(new Date(initialDate).setDate(initialDate.getDate() + i))
          .toISOString()
          .slice(0, 10)
      );

    const generateValues = (num = 10, start = 200, inc = 8) => {
      const values = [start];
      for (let i = 0; i <= num; i += 1) {
        values.push(values[i] + rand(inc));
      }
      return values;
    };

    const date = useRef(new Date(2020, 1, 1));
    const values = useRef(generateValues(200));

    const generateData = () => {
      return {
        Date: generateDates(date.current),
        "Sales Target": values.current,
      };
    };

    const [data, setData] = useState(generateData());

    const addDaysToCurrentDate = (num) => {
      const currentDay = new Date(date.current);
      date.current = new Date(currentDay.setDate(currentDay.getDate() + num));
    };

    useEffect(() => {
      const interval = setTimeout(() => {
        addDaysToCurrentDate(1);

        const intervalValues = values.current.slice();
        intervalValues.splice(0, 1);
        values.current = intervalValues.concat(
          generateValues(1, intervalValues[intervalValues.length])
        );

        setData(generateData());
      }, 1000);

      return () => clearTimeout(interval);
    });

    return (
      <HvLineChart
        data={data}
        groupBy="Date"
        measures={{ field: "Sales Target", hideSymbol: true }}
      />
    );
  },
};

export const ArrowData: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Data loaded in arrow format.",
      },
      // https://github.com/storybookjs/storybook/issues/12726
      inlineStories: false,
      iframeHeight: 485,
    },
  },
  loaders: [
    async () => ({
      // @ts-ignore
      data: await loadArrow(
        "https://lumada-design.github.io/assets/steelwheels.arrow"
      ),
    }),
  ],
  render: (args, { loaded: { data } }) => {
    const [groupBy, setGroupBy] = useState("Territory");
    const [checked, setChecked] = useState(false);

    const styles = {
      checkBox: {
        paddingBottom: 20,
      },
    };

    const salesBy = useMemo(
      () => [
        { label: "Territory", value: "Territory", selected: true },
        { label: "Country", value: "Country" },
      ],
      []
    );

    return (
      <>
        <HvDropdown
          label="Show sales by"
          values={salesBy}
          placement="left"
          onChange={(v: any) => setGroupBy(v?.label ?? "Territory")}
          singleSelectionToggle={false}
        />
        <HvCheckBox
          checked={checked}
          onChange={(_, c) => setChecked(c)}
          label="Split by year"
          className={css(styles.checkBox)}
        />
        <HvLineChart
          data={data}
          xAxis={{
            labelRotation: 60,
          }}
          groupBy={groupBy}
          splitBy={checked ? "Years" : undefined}
          measures="Sales"
          tooltip={{
            valueFormatter(value) {
              return value ? Number(value).toFixed(2) : "-";
            },
          }}
        />
      </>
    );
  },
};

export const MultipleYAxes: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Line chart with multiple y axes.",
      },
    },
  },
  render: () => {
    const tempFormatter = (value?: string | number) => `${value} ºC`;

    const precFormatter = (value?: string | number) => `${value} mm`;

    return (
      <HvLineChart
        data={{
          Month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          Temperature: [
            7.0, 6.2, 4.3, 12.5, 5.3, 12.2, 20.3, 23.4, 25.0, 17.5, 13.0, 11.2,
          ],
          Precipitation: [
            12.6, 15.9, 19.0, 26.0, 28.2, 70.7, 145.6, 132.2, 78.7, 22.8, 4.0,
            2.9,
          ],
        }}
        yAxis={[
          {
            id: "temp",
            labelFormatter: tempFormatter,
            name: "Temperature",
          },
          {
            id: "prec",
            labelFormatter: precFormatter,
            name: "Precipitation",
          },
        ]}
        groupBy="Month"
        measures={[
          {
            field: "Temperature",
            yAxis: "temp",
            valueFormatter: tempFormatter,
          },
          {
            field: "Precipitation",
            yAxis: "prec",
            valueFormatter: precFormatter,
          },
        ]}
      />
    );
  },
};

export const MixedAreaAndLine: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Chart with a line and colored area." },
    },
  },
  render: () => {
    return (
      <HvLineChart
        data={{
          Quarter: ["Q1", "Q2", "Q3", "Q4"],
          "Sales Target": [5000, 5000, 5000, 5000],
          Sales: [6000, 4300, 4760, 7230],
        }}
        groupBy="Quarter"
        measures={["Sales Target", { field: "Sales", area: true }]}
      />
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
      <HvLineChart
        data={{
          Quarter: ["Q1", "Q2", "Q3", "Q4"],
          "Sales Dep 1": [2300, 9000, 8500, 1000],
          "Sales Dep 2": [6000, 2000, 1000, 2000],
          "Sales Target": [10000, 10000, 10000, 10000],
        }}
        groupBy="Quarter"
        measures={[
          { field: "Sales Dep 1", stack: "total", area: true },
          { field: "Sales Dep 2", stack: "total", area: true },
          { field: "Sales Target" },
        ]}
      />
    );
  },
};

export const CustomEchartsOptions: StoryObj<HvLineChartProps> = {
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
      <HvLineChart
        data={{
          Month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          "Sales Target": [
            5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119,
            2146,
          ],
        }}
        groupBy="Month"
        measures="Sales Target"
        onOptionChange={(option) => {
          console.log(option);
          if (Array.isArray(option.yAxis) && option.yAxis.length === 1) {
            option.yAxis = [{ ...option.yAxis[0], splitNumber: 8 }];
          }
          option.series[0].markLine = {
            data: [{ yAxis: 3000, name: "Average" }],
            symbol: "none",
            itemStyle: {
              color: "#F27C27",
            },
          };
          option.series[0].smooth = true;
          option.series[0].lineStyle = {
            color: "#999999",
          };
          option.series[0].itemStyle = {
            color(params) {
              return params.data[1] > 3000 ? "#00CC00" : "#CC0000";
            },
          };

          option.series[0].symbolSize = 8;

          return option;
        }}
      />
    );
  },
};
