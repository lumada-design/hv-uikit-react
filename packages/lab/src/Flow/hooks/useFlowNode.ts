import { useCallback, useMemo } from "react";
import {
  Node,
  Edge,
  ReactFlowState,
  useStore,
  useNodes,
  useEdges,
  useReactFlow,
  useNodeId,
} from "reactflow";

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

export function useFlowInputNodes<T = any>(id: string) {
  const nodes = useNodes();
  const edges = useEdges();

  return useMemo(() => {
    return edges
      .filter((e) => e.target === id)
      .map((e) => nodes.find((n) => n.id === e.source))
      .filter((n): n is Node<T> => n !== null);
  }, [edges, id, nodes]);
}

export function useFlowOutputNodes<T = any>(id: string) {
  const nodes = useNodes();
  const edges = useEdges();

  return useMemo(() => {
    return edges
      .filter((e) => e.source === id)
      .map((e) => nodes.find((n) => n.id === e.target))
      .filter((n): n is Node<T> => n !== null);
  }, [edges, id, nodes]);
}

/** Utilities to manipulate a node in the flow */
export function useFlowNodeUtils() {
  const nodeId = useNodeId();
  const reactFlowInstance = useReactFlow();

  /** Mutate the node's `.data` object */
  const setNodeData = useCallback(
    (setNewData: (newData?: any) => any) => {
      if (!nodeId) return;

      reactFlowInstance.setNodes((nodes) => {
        return nodes.map((n) => {
          if (n.id === nodeId) {
            return { ...n, data: setNewData(n.data) };
          }
          return n;
        });
      });
    },
    [nodeId, reactFlowInstance]
  );

  return useMemo(
    () => ({
      setNodeData,
    }),
    [setNodeData]
  );
}
