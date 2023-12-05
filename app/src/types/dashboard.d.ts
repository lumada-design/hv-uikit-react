import { Node } from "reactflow";
import { HvDashboardProps } from "@hitachivantara/uikit-react-lab";

declare global {
  type NodeGroup = "dashboard" | "visualization" | "dataset";

  interface DashboardSpecs extends Pick<HvDashboardProps, "layout" | "cols"> {
    items: Node<NodeData>[];
  }

  type DashboardsStorage = Record<string, DashboardSpecs | undefined>;
  // ### Local storage ###

  interface NodeData {
    endpoint?: string;
    columns?: string[];
    title?: string;
    unit?: string;
    aggregation?: string;
    measure?: string | string[];
    groupBy?: string | string[];
    splitBy?: string | string[];
  }
}
