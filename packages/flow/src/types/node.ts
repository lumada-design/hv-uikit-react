import { HvSemanticColorKeys } from "@hitachivantara/uikit-react-core";
import { Node, Edge, NodeTypes, NodeProps } from "reactflow";

export type HvNodeData = {
  label?: string;
  acceptedNodes?: string[];
  status?: HvSemanticColorKeys;
  value?: string;
};

export type HvNode<T = HvNodeData> = Node<T>;

export type HvNodeTypes = NodeTypes;

export type HvNodeProps = NodeProps;

export type HvEdge = Edge;
