import React, { useCallback, useMemo, useRef, useState } from "react";
import range from "lodash/range";
import { Random, HvButton } from "@hv/uikit-react-core";
import { Delete, Drag } from "@hv/uikit-react-icons";

const rand = new Random();

const formatDate = (date) => date.toISOString().split("T")[0];

const getOption = (opts, i) => opts[i % opts.length];

const newEntry = (i) => {
  const r = rand.next();
  const [dateMax, dateMin] = [2018, 2022].map((y) => new Date(y, 0).getTime());
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: formatDate(new Date(rand.next(dateMax, dateMin))),
    eventType: "Anomaly detection",
    status: getOption(["Closed", "Open"], i),
    riskScore: rand.next(100, 10),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: (r > 0.66 && "High") || (r > 0.33 && "Medium") || "Low",
  };
};

const controlledSelectedEntry = (i) => {
  const r = rand.next();
  const [dateMax, dateMin] = [2018, 2022].map((y) => new Date(y, 0).getTime());
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: formatDate(new Date(rand.next(dateMax, dateMin))),
    eventType: "Anomaly detection",
    status: getOption(["Closed", "Open"], i),
    riskScore: rand.next(100, 10),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: (r > 0.66 && "High") || (r > 0.33 && "Medium") || "Low",
    selected: r < 0.66,
  };
};

export const makeData = (len = 10) => range(len).map(newEntry);

export const makeSelectedData = (len = 10) => range(len).map(controlledSelectedEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = () => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => `${value}%`,
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedRowsColumns = () => [
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
  { Header: "Status", accessor: "status", style: { width: 120 } },
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => `${value}%`,
    aggregate: "average",
    Aggregated: ({ value }) => `Avg. ${value}%`,
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getLongNameColumns = () => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  {
    Header: "Time is always moving forward without stop",
    accessor: "createdDate",
    style: { minWidth: 100 },
  },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  // numeric values should be right-aligned
  {
    Header: "ProbabilityIsAParameterThatDescribeUncertainty",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => `${value}%`,
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedColumns = () => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  {
    Header: "Event Info",
    columns: [
      { Header: "Status", accessor: "status", style: { width: 120 } },
      // numeric values should be right-aligned
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => `${value}%`,
      },
      { Header: "Severity", accessor: "severity" },
    ],
  },
  { Header: "Priority", accessor: "priority" },
];

export const getDragAndDropColumns = (theme) => [
  {
    id: "dragAndDrop",
    style: {
      borderLeft: "none",
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
      padding: 0,
      width: 34,
      maxWidth: 34,
    },
    // eslint-disable-next-line react/prop-types
    Cell: ({ dragHandleProps }) => {
      return (
        <HvButton
          icon
          category="ghost"
          aria-label="Drag"
          {...{ component: "div" }}
          {...dragHandleProps}
        >
          <Drag />
        </HvButton>
      );
    },
  },
  { Header: "Title", accessor: "name", minWidth: 120 },
  { Header: "Time", accessor: "createdDate", minWidth: 100 },
  { Header: "Status", accessor: "status", width: 120 },
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => `${value}%`,
  },
  { Header: "Priority", accessor: "priority" },
  {
    id: "actions",
    variant: "actions",
    width: 34,
    Cell: () => {
      return (
        <HvButton aria-label="Delete" icon>
          <Delete />
        </HvButton>
      );
    },
  },
];

export const useToggleIndex = (initialState) => {
  const [index, setIndex] = useState(initialState);

  const toggleState = (idx) => () => {
    setIndex(idx === index ? -1 : idx);
  };

  return [index, toggleState];
};

const simpleSortBy = (a, b, sortBy) => {
  const { id, desc } = sortBy;
  if (a[id] < b[id]) return desc ? -1 : 1;
  if (a[id] > b[id]) return desc ? 1 : -1;
  return 0;
};

export const useServerData = () => {
  const serverData = useMemo(() => makeData(999), []);
  const columns = useMemo(() => getColumns(), []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      fetchIdRef.current += 1;
      const fetchId = fetchIdRef.current;

      setLoading(true);

      setTimeout(() => {
        if (fetchId !== fetchIdRef.current) return;

        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;

        const newData = [...serverData]
          .sort(sortBy.length === 0 ? undefined : (a, b) => simpleSortBy(a, b, sortBy[0]))
          .slice(startRow, endRow);
        setData(newData);

        // Static example . Set server-side page count here
        setPageCount(Math.ceil(serverData.length / pageSize));

        setLoading(false);
      }, 600);
    },
    [serverData]
  );

  return [data, columns, fetchData, loading, pageCount];
};
