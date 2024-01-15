import React, { useState, useEffect, useRef } from "react";
import { Random } from "../../utils";
import HvLinechart from "../Linechart";

export default {
  title: "Visualizations/Line Chart",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLinechart } from "@hitachivantara/uikit-react-core";',
  },
  component: HvLinechart,
};

const getMonthNamesArray = () => [
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
];

export const Main = () => (
  <HvLinechart
    title="Simple line"
    subtitle="Sales performance (YTD)"
    xAxisTitle="2018"
    yAxisTitle="Thousands of Dollars ($)"
    data={[
      {
        x: getMonthNamesArray(),
        y: [5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119, 2146],
        name: "Sales Target",
      },
    ]}
  />
);

export const WithArea = () => {
  const data = [
    {
      x: getMonthNamesArray(),
      y: [5929, 2393, 1590, 7817, 4749, 1702, 2381, 2909, 6732, 3098, 2119, 2146],
      name: "Sales Target",
    },
  ];

  return (
    <HvLinechart
      title="Simple line with area"
      subtitle="Sales performance (YTD)"
      data={data}
      type="area"
      xAxisTitle="2018"
      yAxisTitle="Thousands of Dollars ($)"
    />
  );
};

WithArea.story = {
  parameters: {
    docs: {
      storyDescription: "Colors the area below it.",
    },
  },
};

export const LinechartGrouped = () => {
  const months = getMonthNamesArray();
  const data = [
    {
      x: months,
      y: [3400, 5929, 1803, 6470, 6853, 7517, 5636, 4280, 7238, 6889, 8268, 2751],
      name: "Sales Target",
    },
    {
      x: months,
      y: [3022, 3005, 2517, 8397, 6587, 6648, 8067, 2723, 7523, 7853, 4819, 3820],
      name: "Sales Per Rep",
    },
    {
      x: months,
      y: [3900, 4971, 2694, 2177, 7756, 1717, 3308, 2200, 2294, 1771, 2324, 6705],
      name: "Monthly Sales",
    },
  ];

  return (
    <HvLinechart
      title="Multiple lines"
      subtitle="Sales performance (YTD)"
      data={data}
      xAxisTitle="2018"
      yAxisTitle="Thousands of Dollars ($)"
    />
  );
};

LinechartGrouped.story = {
  parameters: {
    docs: {
      storyDescription: "Representation of groups by using multiple lines.",
    },
  },
};

export const GroupedWithArea = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 400], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3000, 3900, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 7500, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [9000, 8500, 8700], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [7000, 8000, 6500], name: "Cash" },
  ];

  return (
    <HvLinechart
      title="Multiple lines"
      subtitle="Sales performance (YTD)"
      data={data}
      xAxisTitle="2018"
      yAxisTitle="Thousands of Dollars ($)"
    />
  );
};

GroupedWithArea.story = {
  parameters: {
    docs: {
      storyDescription: "Groups using colored areas.",
    },
  },
};

export const LinechartStacked = () => {
  const data = [
    { x: ["Group 1", "Group 2", "Group 3"], y: [2300, 1000, 8500], name: "Sales Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [6000, 1000, 1000], name: "Sales Per Rep" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [3700, 7500, 1100], name: "Monthly Sales" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [2100, 8500, 3000], name: "Target" },
    { x: ["Group 1", "Group 2", "Group 3"], y: [500, 8000, 9500], name: "Cash" },
  ];

  return (
    <HvLinechart
      title="Multiple lines with area stacked"
      subtitle="Sales performance (YTD)"
      data={data}
      type="stack"
      xAxisTitle="Axis description"
      yAxisTitle="Thousands of Dollars ($)"
    />
  );
};

LinechartStacked.story = {
  parameters: {
    docs: {
      storyDescription: "Groups in stack mode.",
    },
  },
};

export const TimeRepresentation = () => {
  const r = new Random();
  const rand = (diff) => r.next() * diff - diff / 2;

  const generateDates = (num = 100, startDate = new Date(2020, 0)) =>
    Array.from(Array(num).keys()).map((i) =>
      new Date(new Date(startDate).setDate(startDate.getDate() + i)).toISOString().slice(0, 10)
    );

  const generateValues = (num = 10, start = 100, inc = 1) => {
    const values = [start];
    for (let i = 0; i <= num; i += 1) {
      values.push(values[i] + rand(inc));
    }
    return values;
  };

  const dates = generateDates(200, new Date("2015-02-17"));
  const values = generateValues(dates.length, 200, 8);

  const data = [
    { x: dates, y: values, name: "Sales Target" },
    { x: dates, y: values.map((v) => v + rand(8)), name: "Sales Volume" },
  ];

  return (
    <HvLinechart
      rangeSlider
      title="Time series with range slider"
      subtitle="Sales performance (YTD)"
      data={data}
      xAxisTitle="Date"
      yAxisTitle="Thousands of Dollars ($)"
    />
  );
};

TimeRepresentation.story = {
  parameters: {
    docs: {
      storyDescription: "Representation of time related data.",
    },
    eyes: {
      // story excluded due inconsistent component alignment and relative position, opened 1822 issue
      include: false,
    },
  },
};

export const WithIntervalUpdates = () => {
  const r = new Random();
  const rand = (diff) => r.next() * diff - diff / 2;

  const generateDates = (initialDate, num = 200) =>
    Array.from(Array(num).keys()).map((i) =>
      new Date(new Date(initialDate).setDate(initialDate.getDate() + i)).toISOString().slice(0, 10)
    );

  const generateValues = (num = 10, start = 200, inc = 8) => {
    const values = [start];
    for (let i = 0; i <= num; i += 1) {
      values.push(values[i] + rand(inc));
    }
    return values;
  };

  const date = useRef(new Date("2020-01-01"));
  const values = useRef(generateValues(200));

  const generateData = () => {
    return [{ x: generateDates(date.current), y: values.current, name: "Sales Target" }];
  };

  const [data, setData] = useState(generateData(values.current));

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
    <HvLinechart
      title="Sales performance"
      subtitle="Monthly progress"
      data={data}
      xAxisTitle="Date"
      yAxisTitle="Thousands of Dollars ($)"
      // TODO #1588 Remove fixed height (plotly bug)
      style={{ height: 450 }}
    />
  );
};

WithIntervalUpdates.story = {
  parameters: {
    docs: {
      storyDescription: "Data updated each second.",
    },
  },
};
