import { useCallback, useMemo, useRef, useState } from "react";
import range from "lodash/range";
import { Random } from "@core/utils";
import { HvCellProps, HvTableColumnConfig } from "@core/components";

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

export interface NewEntry {
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
// eslint-disable-next-line react/jsx-no-useless-fragment
const getCell = (value: string) => <>{value}</>;

const rand = new Random();

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

const newEntry = (i: number): NewEntry => {
  const r = rand.next();
  const [dateMax, dateMin] = [2018, 2023].map((y) => new Date(y, 0).getTime());

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

const newRendererEntry = (i: number): NewRendererEntry => {
  const [dateMax, dateMin] = [2018, 2022].map((y) => new Date(y, 0).getTime());
  let eventTypeText = generateEmptyString("Anomaly detection", i);
  eventTypeText = generateLongString(eventTypeText, i);
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: generateEmptyDate(
      formatDate(new Date(rand.next(dateMax, dateMin))),
      i
    ),
    eventQuantity: generateLargeNumber(i),
    eventType: eventTypeText,
    status: {
      status_name: getOption(["Closed", "Open"], i),
      status_color: getTagColor(getOption(["Closed", "Open"], i)),
      status_text_color: "black",
    },
    riskScore: rand.next(100, 10),
    isDisabled: generateBooleanState(i),
    severity: getDropdownOptions(
      ["Critical", "Major", "Average", "Minor"],
      getOption(["Critical", "Major", "Average", "Minor"], i)
    ),
  };
};

const controlledSelectedEntry = (i: number): NewEntry => {
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

export const makeRenderersData = (len: number = 10) =>
  range(len).map(newRendererEntry);

export const makeData = (len: number = 10) => range(len).map(newEntry);

export const makeSelectedData = (len: number = 10) =>
  range(len).map(controlledSelectedEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = (): HvTableColumnConfig<NewEntry, string>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 140 } },
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }: HvCellProps<NewEntry, string>) => getCell(`${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  {
    Header: "Priority",
    accessor: "priority",
  },
];

export const getGroupedRowsColumns = (): HvTableColumnConfig<
  NewEntry,
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
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }: HvCellProps<NewEntry, string>) => getCell(`${value}%`),
    aggregate: "average",
    Aggregated: ({ value }) => getCell(`Avg. ${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedColumns = (): HvTableColumnConfig<
  NewEntry,
  string
>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  {
    Header: "Event Info",
    columns: [
      { Header: "Status", accessor: "status", style: { width: 140 } },
      // numeric values should be right-aligned
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }: HvCellProps<NewEntry, string>) =>
          getCell(`${value}%`),
      },
      { Header: "Severity", accessor: "severity" },
    ],
  },
  { Header: "Priority", accessor: "priority" },
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

  const [data, setData] = useState<any>([]);
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
          .sort(
            sortBy.length === 0
              ? undefined
              : (a, b) => simpleSortBy(a, b, sortBy[0])
          )
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
