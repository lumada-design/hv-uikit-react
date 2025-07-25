import { Edge, Node, useReactFlow } from "@xyflow/react";

import { HvFlowInstance } from "../types";

/** Retrieves the React Flow instance */
export function useFlowInstance<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
>(): HvFlowInstance<NodeData, EdgeData> {
  return useReactFlow<Node<NodeData>, Edge<EdgeData>>();
}
