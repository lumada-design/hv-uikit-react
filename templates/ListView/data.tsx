import useSWR from "swr";
import {
  HvTooltip,
  HvTableColumnConfig,
  HvBulkActionsProps,
  HvColor,
} from "@hitachivantara/uikit-react-core";
import {
  IconType,
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Refresh,
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

const TooltipIcon = ({
  title,
  Icon,
  color,
}: {
  title: string;
  Icon: IconType;
  color: HvColor;
}) => (
  <HvTooltip title={title}>
    <div>
      <Icon role="none" iconSize="XS" color={color} />
    </div>
  </HvTooltip>
);

export const getStatusIcon = (status?: AssetEvent["status"]) => {
  switch (status) {
    case "Open":
      return <TooltipIcon title="Success" Icon={Level0Good} color="positive" />;
    case "Closed":
      return <TooltipIcon title="Error" Icon={Level3Bad} color="negative" />;
    case "Pending":
      return <TooltipIcon title="Open" Icon={Level2Average} color="warning" />;
    default:
      return <TooltipIcon title="Unassigned" Icon={Level1} color="neutral" />;
  }
};

export const getColumns = (): HvTableColumnConfig<AssetEvent, string>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 40 },
    Cell: ({ value }) => getStatusIcon(value),
  },
  { Header: "Name", accessor: "name", style: { minWidth: 200 } },
  { Header: "Priority", accessor: "priority", style: { width: 120 } },
  {
    Header: "Created",
    accessor: "createdAt",
    Cell: ({ value }) => value.slice(0, 10),
  },
  { Header: "Temperature", accessor: "temperature", style: { width: 120 } },
];

export const actions: HvBulkActionsProps["actions"] = [
  { id: "refresh", label: "Refresh", icon: <Refresh /> },
];

// --- Trend data utils ---

export type TrendData = (string | number)[][];

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getTrendData = (variation: string): TrendData => {
  if (variation === "up") {
    return [
      ["Count", "Requests"],
      ["1", getRandom(200, 500)],
      ["2", getRandom(500, 1000)],
      ["3", getRandom(1000, 2000)],
      ["4", getRandom(2000, 3000)],
    ];
  }

  return [
    ["Count", "Requests"],
    ["1", getRandom(2000, 3000)],
    ["2", getRandom(1000, 2000)],
    ["3", getRandom(500, 1000)],
    ["4", getRandom(200, 500)],
  ];
};

// --- Utils ---

const delay = (ms = 500) =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Time passed"), ms);
  });

const requestsSummary = {
  success: {
    count: 10,
    data: getTrendData("up"),
    variation: "up",
  },
  error: {
    count: 21,
    data: getTrendData("down"),
    variation: "down",
  },
  open: {
    count: 5,
    data: getTrendData("down"),
    variation: "down",
  },
  unassign: {
    count: 12,
    data: getTrendData("up"),
    variation: "up",
  },
};

export interface AssetDataParams
  extends Partial<Record<keyof AssetEvent, string>> {
  take: number;
  skip: number;
  sort?: string;
}

export const usePaginationData = (props: AssetDataParams) => {
  return useSWR<{ items: AssetEvent[]; total: number }>(
    ["assets", props],
    async () => {
      // Loading
      await delay(800);

      const params = new URLSearchParams(props as any);
      const url = `https://assets-mock-api.deno.dev/assets?${params}`;

      return fetch(url).then((res) => res.json());
    }
  );
};

export const useSummaryData = () => {
  return useSWR("/requests/summary", async () => {
    // Loading
    await delay(800);

    return requestsSummary;
  });
};
