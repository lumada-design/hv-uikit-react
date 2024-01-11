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

import { ServerPaginationProps, useServerPagination, delay } from "../utils";

// --- Table data utils ---

export interface ListViewEntry {
  id?: string;
  name?: string;
  description?: string;
  serverId?: number;
  created?: string;
  build?: string;
  status?: number;
}

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

export const getStatusIcon = (status?: ListViewEntry["status"]) => {
  switch (status) {
    case 0:
      return <TooltipIcon title="Success" Icon={Level0Good} color="positive" />;
    case 1:
      return <TooltipIcon title="Error" Icon={Level3Bad} color="negative" />;
    case 2:
      return <TooltipIcon title="Open" Icon={Level2Average} color="warning" />;
    default:
      return <TooltipIcon title="Unassigned" Icon={Level1} color="neutral" />;
  }
};

export const getColumns = (): HvTableColumnConfig<ListViewEntry, string>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 40 },
    Cell: ({ value }) => getStatusIcon(value),
  },
  { Header: "Name", accessor: "name", style: { minWidth: 200 } },
  { Header: "Description", accessor: "description", style: { minWidth: 200 } },
  { Header: "Server ID", accessor: "serverId", style: { width: 120 } },
  { Header: "Created", accessor: "created" },
  { Header: "Build", accessor: "build", style: { width: 120 } },
];

export const actions: HvBulkActionsProps["actions"] = [
  { id: "refresh", label: "Refresh", icon: <Refresh /> },
];

const entries = [
  { name: "Previous", description: "Clean Data Logs" },
  { name: "Home", description: "Review Log" },
  { name: "Carriage", description: "Deploy Cloud Run" },
  { name: "Black", description: "Clean Session" },
  { name: "Forward", description: "Update Build" },
];

const getDate = (): string => {
  const start = new Date(2018, 1, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
};

const getRandomStatus = (): number => {
  return Math.floor(Math.random() * 4);
};

const getServerID = (): number =>
  Math.floor(100000000 + Math.random() * 1000000000);

const getBuild = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandEntry = () => entries[Math.floor(Math.random() * entries.length)];

export const createEntry = (i: number): ListViewEntry => {
  const entry = getRandEntry();

  return {
    id: `${i + 1}`,
    name: entry.name,
    description: entry.description,
    serverId: getServerID(),
    created: getDate(),
    build: getBuild(),
    status: getRandomStatus(),
  };
};

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

// --- Data & Endpoints ---
const db = [...Array(20).keys()].map(createEntry);

const countByStatus = (status: number) =>
  db.filter((entry) => entry.status === status).length || 0;

const requestsSummary = {
  success: {
    count: countByStatus(0),
    data: getTrendData("up"),
    variation: "up",
  },
  error: {
    count: countByStatus(1),
    data: getTrendData("down"),
    variation: "down",
  },
  open: {
    count: countByStatus(2),
    data: getTrendData("down"),
    variation: "down",
  },
  unassign: {
    count: countByStatus(3),
    data: getTrendData("up"),
    variation: "up",
  },
};

export interface PaginationDataProps
  extends Omit<ServerPaginationProps<ListViewEntry>, "endpoint" | "db"> {}

export const usePaginationData = (props: PaginationDataProps) => {
  return useServerPagination({ endpoint: "/requests", db, ...props });
};

export const useSummaryData = () => {
  return useSWR("/requests/summary", async () => {
    // Loading
    await delay(800);

    return requestsSummary;
  });
};
