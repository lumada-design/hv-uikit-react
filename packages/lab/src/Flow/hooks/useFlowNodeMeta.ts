import { useNodeMetaRegistry } from "../FlowContext/NodeMetaContext";
import { useNodeId } from "./useNodeId";

export function useFlowNodeMeta(id?: string) {
  const nodeId = useNodeId(id);
  const { registry } = useNodeMetaRegistry();

  return registry[nodeId!];
}
