import {
  Cards,
  Cluster,
  Delete,
  Duplicate,
  MachineLearning,
  LineChartAlt,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlowProps,
  HvFlowDefaultActions,
} from "@hitachivantara/uikit-react-lab";

// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { Dashboard } from "./Dashboard";
import { KPI } from "./KPI";
import { LineChart } from "./LineChart";
import { MLModelDetection } from "./MLModelDetection";
import { MLModelPrediction } from "./MLModelPrediction";
import { Table } from "./Table";
import { Tron } from "./Tron";

// Default actions
export const defaultActions: HvFlowDefaultActions[] = [
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
];

// Node groups
export type NodeGroups = "assets" | "models" | "insights" | "dashboard";

export const nodeGroups = {
  assets: {
    label: "Asset",
    color: "cat3_80",
    description: "Find here all the available assets.",
    icon: <Cluster />,
  },
  models: {
    label: "ML Model",
    color: "cat1_80",
    description: "Find here all the available ML models.",
    icon: <MachineLearning />,
  },
  insights: {
    label: "Insight",
    color: "cat6_80",
    description: "Find here all the available insights.",
    icon: <LineChartAlt />,
  },
  dashboard: {
    label: "Dashboard",
    color: "cat2_80",
    description: "Find here all the available dashboards.",
    icon: <Cards />,
  },
} satisfies HvFlowProps<NodeGroups>["nodeGroups"];

// Node types
export const nodeTypes = {
  tron: Tron,
  mlModelPrediction: MLModelPrediction,
  mlModelDetection: MLModelDetection,
  kpi: KPI,
  lineChart: LineChart,
  table: Table,
  dashboard: Dashboard,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof nodeTypes;
