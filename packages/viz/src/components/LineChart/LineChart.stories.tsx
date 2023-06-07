import {
  theme,
  HvDropDownMenu,
  HvDropdown,
  HvListValue,
  HvTypography,
  HvCheckBox,
  Random,
} from "@hitachivantara/uikit-react-core";
import { useEffect, useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { loadArrow } from "arquero";
import { emptyCellMode } from "@viz/types/generic";
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
  args: {
    area: false,
    stacked: false,
    emptyCellMode: "connect",
    areaOpacity: 0.5,
  },
  argTypes: {
    legend: { control: { disable: true } },
    data: { control: { disable: true } },
    xAxis: { control: { disable: true } },
    yAxis: { control: { disable: true } },
    groupBy: { control: { disable: true } },
    splitBy: { control: { disable: true } },
    measures: { control: { disable: true } },
    sortBy: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    lineNameFormatter: { control: { disable: true } },
    horizontalRangeSlider: { control: { disable: true } },
    emptyCellMode: {
      control: { type: "radio" },
      options: emptyCellMode,
    },
  },
  render: ({
    data,
    xAxis,
    yAxis,
    groupBy,
    splitBy,
    measures,
    sortBy,
    ...others
  }) => {
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

export const MultipleLineCharts: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: { story: "Multiple line charts." },
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
          groupBy="time"
          measures={["Input Feed Rate", "Output Feed", "Availability"]}
        />
      </>
    );
  },
};

export const MultipleLineChartsWithSplitBy: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple line charts created by splitting the data.",
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
          lineNameFormatter={(s) => `${s?.split("_").join(" ")}`}
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
        stacked
      />
    );
  },
};

export const HorizontalRangeSlider: StoryObj<HvLineChartProps> = {
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

    return <HvLineChart data={data} groupBy="Date" measures="Sales Target" />;
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
      iframeHeight: 550,
    },
  },
  loaders: [
    async () => ({
      // @ts-ignore
      data: await loadArrow(import.meta.resolve("./steelwheels.arrow")),
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
        />
      </>
    );
  },
};
