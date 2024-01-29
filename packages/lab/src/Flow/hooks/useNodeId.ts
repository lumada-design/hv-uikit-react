import { useNodeId as useReactNodeId } from "reactflow";

/** Retrieves the node id. INTERNAL USE ONLY */
export function useNodeId(id?: string) {
  const currentNodeId = useReactNodeId();
  return id ?? currentNodeId;
}
