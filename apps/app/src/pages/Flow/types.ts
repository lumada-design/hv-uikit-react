import { Node } from "@xyflow/react";
import { HvDashboardProps } from "@hitachivantara/uikit-react-lab";

export type NodeGroup = "dashboard" | "visualization" | "dataset";

// ### Local storage ###
export const DASHBOARDS_STORAGE_KEY = "dashboards";

export const LAYOUT_COLS = 12;

type FlowNode = Node<NodeData>;

export interface DashboardSpecs
  extends Pick<HvDashboardProps, "layout" | "cols"> {
  items: FlowNode[];
}

export type DashboardsStorage = Record<string, DashboardSpecs | undefined>;
// ### Local storage ###

export interface NodeData extends Record<string, unknown> {
  endpoint?: string;
  columns?: string[];
  title?: string;
  unit?: string;
  aggregation?: string;
  measure?: string | string[];
  groupBy?: string | string[];
  splitBy?: string | string[];
}
