import { Node, useStore } from "reactflow";

export const useFlowNode = (id: string) => {
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);

  // self node
  const node = nodes.find((n: Node) => n.id === id);

  // parent nodes
  const connectedEdges = edges.filter((e) => e.target === id);
  const parentNodes: Node[] = [];

  connectedEdges.forEach((e) => {
    const parentNode = nodes.find((n: Node) => n.id === e.source) as Node;
    parentNodes.push(parentNode);
  });

  return { node, parentNodes };
};
