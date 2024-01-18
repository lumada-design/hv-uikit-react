import {
  HvTooltip,
  HvTableColumnConfig,
  HvCellProps,
  HvBulkActionsProps,
} from "@hitachivantara/uikit-react-core";
import {
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Refresh,
} from "@hitachivantara/uikit-react-icons";

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

export const getStatusIcon = (status?: ListViewEntry["status"]) => {
  switch (status) {
    case 0:
      return <Level0Good color="positive" iconSize="XS" />;
    case 1:
      return <Level3Bad color="negative" iconSize="XS" />;
    case 2:
      return <Level2Average color="warning" iconSize="XS" />;
    default:
      return <Level1 color="neutral" iconSize="XS" />;
  }
};

export const getColumns = (): HvTableColumnConfig<ListViewEntry, string>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 40 },
    Cell: ({ row }: HvCellProps<ListViewEntry, string>) => {
      switch (row.original.status) {
        case 0:
          return (
            <HvTooltip title="Success">
              <div>{getStatusIcon(0)}</div>
            </HvTooltip>
          );
        case 1:
          return (
            <HvTooltip title="Error">
              <div>{getStatusIcon(1)}</div>
            </HvTooltip>
          );
        case 2:
          return (
            <HvTooltip title="Open">
              <div>{getStatusIcon(2)}</div>
            </HvTooltip>
          );
        default:
          return (
            <HvTooltip title="Unassigned">
              <div>{getStatusIcon(3)}</div>
            </HvTooltip>
          );
      }
    },
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

export const idsToControl = {
  list: "itemList",
};

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
