import { Edge, Node, useEdges, useNodes } from "reactflow";

export const useFlowNode = (id: string) => {
  const nodes = useNodes<any>();
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
};
