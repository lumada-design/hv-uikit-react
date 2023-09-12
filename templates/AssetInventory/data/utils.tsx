import {
  HvBulkActionsProps,
  HvControlsProps,
  HvRightControlProps,
  HvSemanticColorKeys,
  HvTableColumnConfig,
  HvCellProps,
  HvTooltip,
  HvTypography,
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

export interface AssetInventoryEntry {
  id?: string;
  name?: string;
  eventType?: string;
  status?: string;
  severity?: string;
  priority?: string;
  time?: string;
  temperature?: string;
  statusColor?: HvSemanticColorKeys;
  image?: string;
}

const images = [
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1589320011103-48e428abcbae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1647427060118-4911c9821b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1612685180313-bdfe1d6896cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1190&q=80",
  "https://images.unsplash.com/photo-1566930665082-4ae9dbbb5b6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
  "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1622534376374-fe4480328daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1618840626133-54463084a141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
  "https://images.unsplash.com/photo-1600715502630-c9300abe78a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

export const getStatusIcon = (color?: AssetInventoryEntry["statusColor"]) => {
  switch (color) {
    case "positive":
      return <Level0Good color="positive" />;
    case "warning":
      return <Level2Average color="warning" />;
    case "negative":
      return <Level3Bad color="negative" />;
    case "neutral":
    default:
      return <Level1 color="neutral" />;
  }
};

const getStatusMessage = (status?: AssetInventoryEntry["statusColor"]) => {
  switch (status) {
    case "positive":
      return "Success";
    case "warning":
      return "Open";
    case "negative":
      return "Error";
    case "neutral":
    default:
      return "Unassigned";
  }
};

export const getColumns = (): HvTableColumnConfig<
  AssetInventoryEntry,
  string
>[] => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 60 },
    Cell: ({ row }: HvCellProps<AssetInventoryEntry, string>) => {
      return (
        <HvTooltip
          title={
            <HvTypography>
              {getStatusMessage(row.original.statusColor)}
            </HvTypography>
          }
        >
          <div>{getStatusIcon(row.original.statusColor)}</div>
        </HvTooltip>
      );
    },
  },
  {
    Header: "Asset",
    accessor: "image",
    style: { maxWidth: 60 },
    Cell: ({ row }: HvCellProps<AssetInventoryEntry, string>) => {
      return (
        <HvTooltip
          placement="right"
          title={
            <div style={{ width: 400 }}>
              <img alt={row.original.name} src={row.original.image} />
            </div>
          }
        >
          <div style={{ maxWidth: 60 }}>
            <img alt={row.original.name} src={row.original.image} />
          </div>
        </HvTooltip>
      );
    },
  },
  { Header: "Title", accessor: "name", style: { minWidth: 140 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "time" },
  { Header: "Temperature", accessor: "temperature" },
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

export const idsToControl = {
  cards: "cardsGrid",
  list: "itemList",
};

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

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const getTime = (priority: string, index: number) => {
  let i = priority === "High" ? index + 4 : index + 3;
  i = priority === "Medium" ? i + 30 : index + 20;

  return `${i % 12}:${i % 60}:${i % 60}`;
};

const getPriority = (i: number) =>
  (i % 2 > 0 && "High") || (i % 2 < 0 && "Medium") || "Low";

const getRandomStatus = (): HvSemanticColorKeys => {
  return ["neutral", "positive", "negative", "warning"][
    Math.floor(Math.random() * 5)
  ] as HvSemanticColorKeys;
};

export const createEntry = (i: number): AssetInventoryEntry => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    eventType: `Anomaly detection ${i % 4}`,
    status: getOption(["Closed", "Open"], i),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getPriority(i),
    time: getTime(getPriority(i), i),
    temperature: `${i + 35}º C`,
    statusColor: getRandomStatus(),
    image: getRandomImage(),
  };
};
