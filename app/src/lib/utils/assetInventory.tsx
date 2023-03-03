import { HvSemanticColorKeys } from "@hitachivantara/uikit-react-core";
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

const getRandomStatus = () => {
  return `sema${Math.floor(Math.random() * 4)}`;
};

const getNewEntry = (i: number) => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    eventType: `Anomaly detection ${i % 4}`,
    status: getOption(["Closed", "Open"], i),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getPriority(i),
    time: getTime(getPriority(i), i),
    temperature: `${i + 35}`,
    statusColor: getRandomStatus() as HvSemanticColorKeys | "sema0" | undefined,
  };
};

export const makeData = (len = 10) => {
  const data = [];
  for (let i = 0; i <= len; i += 1) {
    // @ts-ignore
    data.push(getNewEntry(i));
  }
  return data;
};

// Config Utils

export const getColumns = () => [
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
    case "sema1":
      return <Level0Good semantic="sema1" />;
    case "sema2":
      return <Level1 semantic="sema2" />;
    case "sema3":
      return <Level2Average semantic="sema3" />;
    case "sema4":
      return <Level3Bad semantic="sema4" />;
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
