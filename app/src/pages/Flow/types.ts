import { Node } from "reactflow";

export type NodeGroup = "dashboard" | "visualization" | "dataset";

export interface DashboardNode {
  endpoint: string;
  node: Node;
}

export type Dashboards = Record<string, DashboardNode[]>;
