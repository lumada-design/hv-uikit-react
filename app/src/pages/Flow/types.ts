import { Node } from "reactflow";

import { DashboardLayout } from "./Dashboard";

export type NodeGroup = "dashboard" | "visualization" | "dataset";

// ### Local storage ###
export const DASHBOARDS_STORAGE_KEY = "dashboards";

export const LAYOUT_COLS = 12;

export interface DashboardSpecs {
  nodes?: { node: Node; endpoint?: string }[];
  layout?: DashboardLayout[];
  layoutCols?: number;
}

export type DashboardsStorage = Record<string, DashboardSpecs | undefined>;
// ### Local storage ###
