import { HvNode, HvEdge } from "../../types";

export const getNode = (nodes: HvNode[], nodeId: string) => {
  return nodes.find((n) => n.id === nodeId);
};

export const getParentNodes = (
  nodes: HvNode[],
  edges: HvEdge[],
  nodeId: string
): HvNode[] => {
  const eds = edges.filter((e) => e.target === nodeId);
  const parentNodes = eds.map((e) => getNode(nodes, e.source) as HvNode);
  return parentNodes;
};

export const getNodesByType = (nodes: HvNode[], nodeType: string) => {
  const nds = nodes.filter((n) => n.type === nodeType);
  return nds;
};

export const getIncomingEdgesCount = (edges: HvEdge[], nodeId: string) => {
  const eds = edges.filter((e) => e.target === nodeId);
  return eds.length;
};
