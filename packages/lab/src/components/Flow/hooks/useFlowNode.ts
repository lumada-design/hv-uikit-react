import { Edge, Node, useStore } from "reactflow";

export const useFlowNode = (id: string) => {
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);

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
