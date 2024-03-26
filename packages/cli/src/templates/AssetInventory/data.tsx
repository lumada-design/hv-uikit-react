import { useRef } from "react";
import useSWR from "swr";
import {
  HvBulkActionsProps,
  HvControlsProps,
  HvRightControlProps,
  HvSkeleton,
  HvTableColumnConfig,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";
import {
  Cards,
  List,
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Add,
  Delete,
  Preview,
} from "@hitachivantara/uikit-react-icons";

// --- Table data utils ---

export type AssetEvent = {
  id: string;
  name: string;
  createdAt: string;
  eventType: string;
  riskScore: number;
  status?: "Open" | "Pending" | "Closed";
  severity?: "Critical" | "Major" | "Average" | "Minor";
  priority?: "High" | "Medium" | "Low";
  temperature: number;
  imageUrl: string;
};

export const getStatusIcon = (severity?: AssetEvent["status"]) => {
  switch (severity) {
    case "Open":
      return <Level0Good color="positive" />;
    case "Pending":
      return <Level2Average color="warning" />;
    case "Closed":
      return <Level3Bad color="negative" />;
    default:
      return <Level1 color="neutral" />;
  }
};

export const getColumns = (
  loading?: boolean
): HvTableColumnConfig<AssetEvent, string>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 60 },
    Cell: ({ value }) =>
      loading ? (
        <HvSkeleton width={32} height={32} variant="circle" animation="wave" />
      ) : (
        <HvTooltip title={value}>
          <div>{getStatusIcon(value)}</div>
        </HvTooltip>
      ),
  },
  {
    Header: "Asset",
    accessor: "imageUrl",
    style: { maxWidth: 60 },
    Cell: ({ value, row }) => {
      return loading ? (
        <HvSkeleton width={60} height={40} variant="square" animation="wave" />
      ) : (
        <HvTooltip
          placement="right"
          title={
            <div style={{ width: 400 }}>
              <img alt={row.original.name} src={value} />
            </div>
          }
        >
          <div style={{ maxWidth: 60 }}>
            <img alt={row.original.name} src={value} />
          </div>
        </HvTooltip>
      );
    },
  },
  {
    Header: "Title",
    accessor: "name",
    style: { minWidth: 140 },
    Cell: ({ value }) => {
      return loading ? <HvSkeleton animation="wave" /> : <span>{value}</span>;
    },
  },
  {
    Header: "Event Type",
    accessor: "eventType",
    style: { minWidth: 100 },
    Cell: ({ value }) => {
      return loading ? <HvSkeleton animation="wave" /> : <span>{value}</span>;
    },
  },
  {
    Header: "Severity",
    accessor: "severity",
    Cell: ({ value }) => {
      return loading ? <HvSkeleton animation="wave" /> : <span>{value}</span>;
    },
  },
  {
    Header: "Priority",
    accessor: "priority",
    Cell: ({ value }) => {
      return loading ? <HvSkeleton animation="wave" /> : <span>{value}</span>;
    },
  },
  {
    Header: "Time",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return loading ? (
        <HvSkeleton animation="wave" />
      ) : (
        <span>{value.slice(11, 19)}</span>
      );
    },
  },
  {
    Header: "Temperature",
    accessor: "temperature",
    Cell: ({ value }) => {
      return loading ? <HvSkeleton animation="wave" /> : <span>{value}º</span>;
    },
  },
];

export const actions: HvBulkActionsProps["actions"] = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "put", label: "Preview", icon: <Preview /> },
];

export const views: HvControlsProps["views"] = [
  {
    id: "card",
    "aria-label": "Select card view",
    icon: <Cards />,
  },
  {
    id: "list",
    "aria-label": "Select list view",
    icon: <List />,
  },
];

export const rightControlValues: HvRightControlProps["values"] = [
  {
    id: "nameAsc",
    accessor: "name",
    label: "Name Ascending",
    desc: false,
  },
  {
    id: "nameDesc",
    accessor: "name",
    label: "Name Descending",
    desc: true,
  },
  {
    id: "eventTypeAsc",
    accessor: "eventType",
    label: "Event Type Ascending",
    desc: false,
  },
  {
    id: "eventTypeDesc",
    accessor: "eventType",
    label: "Event Type Descending",
    desc: true,
  },
  {
    id: "severityAsc",
    accessor: "severity",
    label: "Severity Ascending",
    desc: false,
  },
  {
    id: "severityDesc",
    accessor: "severity",
    label: "Severity Descending",
    desc: true,
  },
];

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export interface AssetDataParams
  extends Partial<Record<keyof AssetEvent, string>> {
  take: number;
  skip: number;
  sort?: string;
}

export const useAssetData = (props: AssetDataParams) => {
  return useSWR<{ items: AssetEvent[]; total: number }>(
    ["assets", props],
    async () => {
      await delay(800);
      const params = new URLSearchParams(props as any);
      const url = `https://assets-mock-api.deno.dev/assets?${params}`;
      return fetch(url).then((res) => res.json());
    }
  );
};

/** Persists the last non-nullish value */
export const useStickyResult = <T extends any>(value: T) => {
  const val = useRef<T>();
  if (value != null) val.current = value;
  return val.current;
};
