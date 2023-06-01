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
import { hvChartEmptyCellMode } from "@viz/types";
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
    variant: "line",
    emptyCellMode: "connect",
  },
  argTypes: {
    legend: { control: { disable: true } },
    data: { control: { disable: true } },
    xAxis: { control: { disable: true } },
    measures: { control: { disable: true } },
    series: { control: { disable: true } },
    tooltip: { control: { disable: true } },
    lineNameFormatter: { control: { disable: true } },
    emptyCellMode: {
      control: { type: "radio" },
      options: hvChartEmptyCellMode,
    },
  },
  render: ({ data, xAxis, measures, ...others }) => {
    return (
      <HvLineChart
        data={{
          values: {
            Months: [
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
          },
        }}
        xAxis={{
          fields: "Months",
        }}
        measures={{
          fields: "Sales Target",
        }}
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
        data={{
          values: new Map<string, (string | number)[]>()
            .set("Months", [
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
                5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098,
                2119, 2146,
              ]
            ),
        }}
        xAxis={{
          fields: "Months",
        }}
        measures={{
          fields: "Sales Target",
        }}
        variant="area"
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
        data={{
          values: [
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
          ],
          type: "row",
        }}
        xAxis={{ fields: "Month" }}
        measures={{
          fields: ["Sales Target", "Sales Per Rep", "Monthly Sales"],
        }}
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
          data={{ values: chartData[country][time] }}
          xAxis={{ fields: "time" }}
          measures={{
            fields: ["Input Feed Rate", "Output Feed", "Availability"],
          }}
        />
      </>
    );
  },
};

export const MultipleLineChartsWithPivot: StoryObj<HvLineChartProps> = {
  parameters: {
    docs: {
      description: {
        story: "Multiple line charts using pivot columns to create series.",
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
          label="Show by medal type"
          className={css(styles.checkBox)}
        />
        <HvLineChart
          data={{
            values: {
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
                2018, 2018, 2018, 2018, 2018, 2018, 2018, 2018, 2019, 2019,
                2019, 2019, 2019, 2019, 2019, 2019, 2020, 2020, 2020, 2020,
                2020, 2020, 2020, 2020,
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
                3, 2, 1, 0, 4, 11, 8, 3, 2, 9, 0, 5, 3, 6, 2, 1, 7, 5, 6, 9, 2,
                5, 6, 7,
              ],
            },
          }}
          xAxis={{
            fields: "Year",
          }}
          measures={{
            fields: "Total",
          }}
          series={checked ? ["Country", "Medal"] : "Country"}
          lineNameFormatter={(s) => `${s.split("_").join(" ")}`}
        />
      </>
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
        Dates: generateDates(date.current),
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
        data={{ values: data }}
        xAxis={{ fields: "Dates" }}
        measures={{ fields: "Sales Target" }}
      />
    );
  },
};
