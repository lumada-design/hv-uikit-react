import { Edge, Node, NodeProps, ReactFlowInstance } from "@xyflow/react";
import {
  HvActionGeneric,
  HvSliderProps,
} from "@hitachivantara/uikit-react-core";
import { HvColorAny } from "@hitachivantara/uikit-styles";

import type { HvFlowNodeProps } from "./Node";

// Node types

/** HvFlowNode component type. @extends React.FC */
export interface HvFlowNodeFC<NodeType extends Node = Node>
  extends React.FC<NodeProps<NodeType>> {}

export type HvFlowNodeTypes<NodeType extends Node = Node> = Record<
  string,
  HvFlowNodeFC<NodeType>
>;

export interface HvFlowGroupItem<NodeType extends Node = Node>
  extends Pick<HvFlowNodeProps, "params" | "subtitle"> {
  /** The node identifier registered in `nodeTypes` */
  nodeType: string;
  label: string;
  data?: NodeType["data"];
}

/** Node groups */
export interface HvFlowNodeGroup {
  label: string;
  description?: string;
  color?: HvColorAny;
  icon?: React.ReactNode;
  items?: HvFlowGroupItem[];
}
export type HvFlowNodeGroups<GroupId extends keyof any = string> = Record<
  GroupId,
  HvFlowNodeGroup
>;

export interface HvFlowNodeMeta {
  label: string;
  inputs?: (HvFlowNodeInput | HvFlowNodeInputGroup)[];
  outputs?: (HvFlowNodeOutput | HvFlowNodeOutputGroup)[];
}

export interface HvFlowNodeInput {
  id?: string;
  label: React.ReactNode;
  isMandatory?: boolean;
  accepts?: string[];
  maxConnections?: number;
}

export interface HvFlowNodeInputGroup {
  label: React.ReactNode;
  inputs: HvFlowNodeInput[];
}

export interface HvFlowNodeOutput {
  id?: string;
  label: React.ReactNode;
  isMandatory?: boolean;
  provides?: string;
  maxConnections?: number;
}

export interface HvFlowNodeOutputGroup {
  label: React.ReactNode;
  outputs: HvFlowNodeOutput[];
}

export interface HvFlowNodeSharedParam {
  id: string;
  label: string;
}

export interface HvFlowNodeTextParam extends HvFlowNodeSharedParam {
  type: "text";
}

export interface HvFlowNodeSelectParam extends HvFlowNodeSharedParam {
  type: "select";
  multiple?: boolean;
  options?: string[] | { id: string; label: string }[]; // v6 - only allow objects
}

export interface HvFlowNodeSliderParam
  extends HvFlowNodeSharedParam,
    Omit<HvSliderProps, keyof HvFlowNodeSharedParam> {
  type: "slider";
}

export type HvFlowNodeParam =
  | HvFlowNodeSelectParam
  | HvFlowNodeTextParam
  | HvFlowNodeSliderParam;

export interface HvFlowNodeAction extends HvActionGeneric {
  callback?: (node: Node) => void;
}

export type HvFlowBuiltInAction = "delete" | "duplicate";

export type HvFlowBuiltInActions = Omit<HvFlowNodeAction, "id" | "callback"> & {
  id: HvFlowBuiltInAction;
};

export type HvFlowNodeMetaRegistry = Record<string, HvFlowNodeMeta>;

export type HvFlowInstance<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> = ReactFlowInstance<NodeType, EdgeType>;
