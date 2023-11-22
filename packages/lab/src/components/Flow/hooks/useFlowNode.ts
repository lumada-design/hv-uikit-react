import { useCallback } from "react";
import { Node, Edge, ReactFlowState, useStore } from "reactflow";

export function useFlowNode<T extends Node = Node>(id: string) {
  const nodeSelector = useCallback(
    (state: ReactFlowState) =>
      state.getNodes().find((n: Node): n is T => n.id === id),
    [id]
  );
  return useStore<T | undefined>(nodeSelector);
}

export function useFlowNodeInputEdges(id: string) {
  const inputEdgesSelector = useCallback(
    (state: ReactFlowState) => state.edges.filter((e: Edge) => e.target === id),
    [id]
  );
  return useStore(inputEdgesSelector);
}

export function useFlowNodeOutputEdges(id: string) {
  const outputEdgesSelector = useCallback(
    (state: ReactFlowState) => state.edges.filter((e: Edge) => e.source === id),
    [id]
  );
  return useStore(outputEdgesSelector);
}

export function useFlowNodeEdges(id: string) {
  const edgesSelector = useCallback(
    (state: ReactFlowState) =>
      state.edges.filter((e: Edge) => e.source === id || e.target === id),
    [id]
  );
  return useStore(edgesSelector);
}

export function useFlowNodeParents(id: string) {
  const inputEdges = useFlowNodeInputEdges(id);
  const parentNodesSelector = useCallback(
    (state: ReactFlowState) => {
      return inputEdges
        .map((e) => state.getNodes().find((n: Node) => n.id === e.source))
        .filter((n): n is Node => n !== null);
    },
    [inputEdges]
  );
  return useStore(parentNodesSelector);
}
