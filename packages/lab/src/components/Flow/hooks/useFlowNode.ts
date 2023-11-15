import { Edge, Node, useEdges, useNodes } from "reactflow";

export function useFlowNode<T = any>(id: string) {
  const nodes = useNodes<T>();
  const edges = useEdges();

  return {
    // self node
    get node() {
      const self = nodes.find((n: Node) => n.id === id);
      return self;
    },

    // parent nodes
    get parentNodes() {
      const connectedEdges = edges.filter((e: Edge) => e.target === id);
      const parentNodeArray = connectedEdges.map((e) => {
        const parentNode = nodes.find((n: Node) => n.id === e.source) as Node;
        return parentNode;
      });
      return parentNodeArray;
    },
  };
}
