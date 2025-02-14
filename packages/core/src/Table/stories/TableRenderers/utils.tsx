import {
  HvEmptyState,
  HvTableCell,
  HvTableRow,
  type HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

export const EmptyRow = ({ height }: React.CSSProperties) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message="No data to display" icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

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
  severity?: {
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
export type AssetEvent = {
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
};

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const generateLongString = (value: string | undefined, i: number) =>
  i === 6
    ? "very long string that should be cut if it doesn't fit in the column"
    : value;

const getDropdownOptions = (options: string[] = [], selected = "") => {
  return options.map((option, index) => ({
    id: `${option}-${index}`,
    label: option,
    selected: selected === option,
  }));
};

const severities = ["Critical", "Major", "Average", "Minor"];

const newRendererEntry = (i: number): NewRendererEntry => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate: i === 7 ? undefined : formatDate(new Date("2020-03-20")),
    eventQuantity: i === 6 ? undefined : i,
    eventType: generateLongString(i === 3 ? undefined : "Anomaly detection", i),
    status: {
      status_name: getOption(["Closed", "Open"], i),
      status_color: getOption(["negative_20", "positive_20"], i),
      status_text_color: "black",
    },
    riskScore: (i % 100) + 1,
    isDisabled: i % 3 === 0,
    severity: getDropdownOptions(severities, getOption(severities, i)),
  };
};

export const makeRenderersData = (len = 10) =>
  [...Array(len).keys()].map(newRendererEntry);

// https://react-table-v7-docs.netlify.app/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = (): HvTableColumnConfig<AssetEvent, string>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { minWidth: 100 } },
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right", // numeric values should be right-aligned
    Cell: ({ value }) => `${value}%`,
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];
