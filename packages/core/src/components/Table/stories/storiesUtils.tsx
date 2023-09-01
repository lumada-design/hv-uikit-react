import React, { useCallback, useRef, useState } from "react";

import range from "lodash/range";

import { HvTableColumnConfig } from "../hooks/useTable";

export interface NewRendererEntry {
  id: string;
  name: string;
  createdDate?: string;
  eventType?: string;
  riskScore: number;
  status: {
    status_name?: string;
    status_color?: string;
    status_text_color?: string;
  };
  severity: {
    id?: string;
    label?: string;
    selected?: boolean;
  }[];
  isDisabled: boolean;
  eventQuantity?: number;
}

/**
 * `AssetEvent` is a dummy data type for HvTable samples
 * In a real-world scenario, this would probably come from the API
 * */
export interface AssetEvent {
  id: string;
  name: string;
  createdDate: string;
  eventType: string;
  riskScore: number;
  status: string | null;
  severity: string;
  priority: string;
  link?: string;
  selected?: boolean;
}

// If a Cell gets a value, it has to return a react element
const getCell = (value: string) => value as unknown as React.ReactElement;

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const getTagColor = (status: string) =>
  status === "Closed" ? "negative_20" : "positive_20";

const generateLongString = (value: string | undefined, i: number) =>
  i === 6
    ? "very long string that should be cut if it doesn't fit in the column"
    : value;

const generateEmptyDate = (value: string, i: number) =>
  i === 7 ? undefined : value;

const generateEmptyString = (value: string, i: number) =>
  i === 3 ? undefined : value;

const generateLargeNumber = (i: number) => (i === 6 ? undefined : i);

const generateBooleanState = (i: number) => i % 3 === 0;

const getDropdownOptions = (options: string[] = [], selected = "") => {
  return options.map((option, index) => {
    return {
      id: `${option}-${index}`,
      label: option,
      selected: selected === option,
    };
  });
};

const makeEvent = (i: number): AssetEvent => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: formatDate(new Date("2020-03-20")),
    eventType: "Anomaly detection",
    status: getOption(["Closed", "Open"], i),
    riskScore: (i % 100) + 1,
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getOption(["High", "Medium", "Low"], i),
  };
};

const newRendererEntry = (i: number): NewRendererEntry => {
  let eventTypeText = generateEmptyString("Anomaly detection", i);
  eventTypeText = generateLongString(eventTypeText, i);

  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: generateEmptyDate(formatDate(new Date("2020-03-20")), i),
    eventQuantity: generateLargeNumber(i),
    eventType: eventTypeText,
    status: {
      status_name: getOption(["Closed", "Open"], i),
      status_color: getTagColor(getOption(["Closed", "Open"], i)),
      status_text_color: "black",
    },
    riskScore: (i % 100) + 1,
    isDisabled: generateBooleanState(i),
    severity: getDropdownOptions(
      ["Critical", "Major", "Average", "Minor"],
      getOption(["Critical", "Major", "Average", "Minor"], i)
    ),
  };
};

const controlledSelectedEntry = (i: number): AssetEvent => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: formatDate(new Date("2020-03-20")),
    eventType: "Anomaly detection",
    status: getOption(["Closed", "Open"], i),
    riskScore: (i % 100) + 1,
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getOption(["High", "Medium", "Low"], i),
    selected: i < 3,
  };
};

export const makeRenderersData = (len: number = 10) =>
  range(len).map(newRendererEntry);

export const makeData = (len: number = 10) => range(len).map(makeEvent);

export const makeSelectedData = (len: number = 10) =>
  range(len).map(controlledSelectedEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = (): HvTableColumnConfig<AssetEvent, string>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 140 } },
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right", // numeric values should be right-aligned
    Cell: ({ value }) => getCell(`${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedRowsColumns = (): HvTableColumnConfig<
  AssetEvent,
  string
>[] => [
  {
    Header: "Title",
    accessor: "name",
    style: { minWidth: 120 },
  },
  {
    Header: "Time",
    accessor: "createdDate",
    style: { minWidth: 100 },
  },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 140 } },
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right", // numeric values should be right-aligned
    Cell: ({ value }) => getCell(`${value}%`),
    aggregate: "average",
    Aggregated: ({ value }) => getCell(`Avg. ${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedColumns = (): HvTableColumnConfig<
  AssetEvent,
  string
>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  {
    Header: "Event Info",
    columns: [
      { Header: "Status", accessor: "status", style: { width: 140 } },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right", // numeric values should be right-aligned
        Cell: ({ value }) => getCell(`${value}%`),
      },
      { Header: "Severity", accessor: "severity" },
    ],
  },
  { Header: "Priority", accessor: "priority" },
];

export const useToggleIndex = (initialState: number) => {
  const [index, setIndex] = useState(initialState);

  const toggleState = (idx: number) => () => {
    setIndex(idx === index ? -1 : idx);
  };

  return [index, toggleState] as const;
};

const simpleSortBy = (a: AssetEvent, b: AssetEvent, sortBy) => {
  const { id, desc } = sortBy;
  return desc ? b[id] - a[id] : a[id] - b[id];
};

const serverData = makeData(999);

export const useServerData = () => {
  const [data, setData] = useState<AssetEvent[]>();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(({ pageSize, pageIndex, sortBy }) => {
    fetchIdRef.current += 1;
    const fetchId = fetchIdRef.current;

    setLoading(true);

    setTimeout(() => {
      if (fetchId !== fetchIdRef.current) return;

      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;

      const newData = [...serverData]
        .sort(sortBy[0] ? (a, b) => simpleSortBy(a, b, sortBy[0]) : undefined)
        .slice(startRow, endRow);
      setData(newData);

      // Static example . Set server-side page count here
      setPageCount(Math.ceil(serverData.length / pageSize));

      setLoading(false);
    }, 600);
  }, []);

  return { data, fetchData, loading, pageCount };
};
