import { useNodeId as useReactNodeId } from "@xyflow/react";

/** Retrieves the node id. INTERNAL USE ONLY */
export function useNodeId(id?: string) {
  const currentNodeId = useReactNodeId();
  return id ?? currentNodeId;
}
