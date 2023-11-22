import { useNodeMetaRegistry } from "../FlowContext/NodeMetaContext";

export function useFlowNodeMeta(id: string) {
  const { registry } = useNodeMetaRegistry();

  return registry[id];
}
