import {
  HvSemanticColorKeys,
  HvTableColumnConfig,
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

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const getTime = (priority: string, index: number) => {
  let i = priority === "High" ? index + 4 : index + 3;
  i = priority === "Medium" ? i + 30 : index + 20;
  return `${i % 12}:${i % 60}:${i % 60}`;
};

const getPriority = (i: number) =>
  (i % 2 > 0 && "High") || (i % 2 < 0 && "Medium") || "Low";

const getRandomStatus = (): HvSemanticColorKeys | "sema0" => {
  const colors: (HvSemanticColorKeys | "sema0")[] = [
    "sema0",
    "positive",
    "neutral",
    "warning",
    "negative",
  ];

  return colors[Math.floor(Math.random() * 4)];
};

const getNewEntry = (i: number): AssetInventoryModel => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    eventType: `Anomaly detection ${i % 4}`,
    status: getOption(["Closed", "Open"], i),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getPriority(i),
    time: getTime(getPriority(i), i),
    temperature: `${i + 35}`,
    statusColor: getRandomStatus(),
  };
};

export const makeData = (len = 10): AssetInventoryModel[] => {
  const data: AssetInventoryModel[] = [];
  for (let i = 0; i <= len; i += 1) {
    data.push(getNewEntry(i));
  }
  return data;
};

// Config Utils

export const getColumns = (): HvTableColumnConfig<
  AssetInventoryModel,
  string
>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "time" },
  { Header: "Temperature", accessor: "temperature" },
];

export const getStatusIcon = (color: string) => {
  switch (color) {
    case "positive":
      return <Level0Good semantic="positive" />;
    case "neutral":
      return <Level1 semantic="neutral" />;
    case "warning":
      return <Level2Average semantic="warning" />;
    case "negative":
      return <Level3Bad semantic="negative" />;
    default:
      return undefined;
  }
};

export const actions = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "put", label: "Preview", icon: <Preview /> },
];

export const views = [
  { id: "card", label: "Select card view", icon: <Cards /> },
  { id: "list", label: "Select list view", icon: <List /> },
];

export const idsToControl = {
  cards: "cardsGrid",
  list: "itemList",
};

export const rightControlValues = [
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
