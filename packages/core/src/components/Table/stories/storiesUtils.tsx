import { useCallback, useMemo, useRef, useState } from "react";
import range from "lodash/range";
import { Random } from "utils";
import { HvButton, HvTableColumnConfig } from "components";
import { Delete, Drag } from "@hitachivantara/uikit-react-icons";

export type SampleStatusProps = {
  status_name?: string;
  status_color?: string;
  status_text_color?: string;
};

export type SampleDataProps = {
  id: string;
  name: string;
  createdDate: string;
  eventType: string;
  riskScore: number;
  status?: string | SampleStatusProps | null;
  severity?:
    | string
    | {
        id?: string;
        label?: string;
        selected?: boolean;
      }[];
  priority?: string;
  isDisabled?: boolean;
  link?: string;
  selected?: boolean;
  eventQuantity?: number;
};

// Sets Header to string since it can have multiple types
export type SampleColumn = HvTableColumnConfig<SampleDataProps>;

// If a Cell gets a value, it has to return a react element
const getCell = (value: string) => <>{value}</>;

const rand = new Random();

const formatDate = (date) => date.toISOString().split("T")[0];

const getOption = (opts, i) => opts[i % opts.length];

const getTagColor = (status) => (status === "Closed" ? "sema9" : "sema8");

const generateLongString = (value, i) =>
  i === 6
    ? "very long string that should be cut if it doesn't fit in the column"
    : value;

const generateEmptyDate = (value, i) => (i === 7 ? undefined : value);

const generateEmptyString = (value, i) => (i === 3 ? undefined : value);

const generateLargeNumber = (i) => (i === 6 ? undefined : i);

const generateBooleanState = (i) => i % 3 === 0;

const getDropdownOptions = (options: string[] = [], selected = "") => {
  return options.map((option, index) => {
    return {
      id: `${option}-${index}`,
      label: option,
      selected: selected === option,
    };
  });
};

const newEntry = (i: number): SampleDataProps => {
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

const newRendererEntry = (i: number): SampleDataProps => {
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

const controlledSelectedEntry = (i: number): SampleDataProps => {
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

export const makeRenderersData = (len = 10) => range(len).map(newRendererEntry);

export const makeData = (len = 10) => range(len).map(newEntry);

export const makeSelectedData = (len = 10) =>
  range(len).map(controlledSelectedEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = (): SampleColumn[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => getCell(`${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  {
    Header: "Priority",
    accessor: "priority",
  },
];

export const getGroupedRowsColumns = (): SampleColumn[] => [
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
    Cell: ({ value }) => getCell(`${value}%`),
    aggregate: "average",
    Aggregated: ({ value }) => getCell(`Avg. ${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getLongNameColumns = (): SampleColumn[] => [
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
    Cell: ({ value }) => getCell(`${value}%`),
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const getGroupedColumns = (): SampleColumn[] => [
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
        Cell: ({ value }) => getCell(`${value}%`),
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
    Cell: ({ dragHandleProps }) => {
      return (
        <HvButton
          icon
          variant="primaryGhost"
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
    Cell: ({ value }) => getCell(`${value}%`),
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
