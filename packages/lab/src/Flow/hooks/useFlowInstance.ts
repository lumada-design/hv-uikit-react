import { Edge, Node, useReactFlow } from "@xyflow/react";

import { HvFlowInstance } from "../types";

/** Retrieves the React Flow instance */
export function useFlowInstance<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>(): HvFlowInstance<NodeType, EdgeType> {
  return useReactFlow<NodeType, EdgeType>();
}
