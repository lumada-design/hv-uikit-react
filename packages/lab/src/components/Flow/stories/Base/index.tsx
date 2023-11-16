import {
  Cards,
  Cluster,
  MachineLearning,
  LineChartAlt,
} from "@hitachivantara/uikit-react-icons";
import { HvFlowProps } from "@hitachivantara/uikit-react-lab";
import { Modifier } from "@dnd-kit/core";

// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { Dashboard } from "./Dashboard";
import { KPI } from "./KPI";
import { LineChart } from "./LineChart";
import { MLModelDetection } from "./MLModelDetection";
import { MLModelPrediction } from "./MLModelPrediction";
import { Table } from "./Table";
import { Asset } from "./Asset";

// Node groups
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
} satisfies HvFlowProps["nodeGroups"];

export type NodeGroups = keyof typeof nodeGroups;

// Node types
export const nodeTypes = {
  Asset,
  mlModelPrediction: MLModelPrediction,
  mlModelDetection: MLModelDetection,
  kpi: KPI,
  lineChart: LineChart,
  table: Table,
  dashboard: Dashboard,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof nodeTypes;

// Fixes a problem we have while dragging node types from the sidebar to the flow in storybook docs mode
type RestrictToSampleModifier = Modifier extends (...args: infer A) => infer R
  ? (rootId: string, ...args: A) => R
  : unknown;

export const restrictToSample: RestrictToSampleModifier = (
  rootId,
  { transform }
) => {
  const rect = document.getElementById(rootId)?.getBoundingClientRect();

  const docsMode = window.location.search.includes("?viewMode=docs");

  return {
    ...transform,
    x: docsMode && rect?.x ? -rect.x + transform.x : transform.x,
    y: docsMode && rect?.y ? -rect.y + transform.y : transform.y,
  };
};
