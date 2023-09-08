import { HvColorAny } from "@hitachivantara/uikit-styles";
import { ComponentClass, FunctionComponent } from "react";
import { Edge, Node, NodeProps } from "reactflow";

/** Edge */
export type HvFlowEdge = Edge;

/** Node */
export type HvFlowNode<
  NodeData = any,
  NodeType extends string | undefined = string | undefined
> = Node<NodeData, NodeType>;

/** Node types */
export interface HvFlowNodeFunctionComponent<GroupId extends keyof any = string>
  extends FunctionComponent<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: {
    groupId: GroupId;
    label: string;
  };
}
export interface HvFlowNodeComponentClass<GroupId extends keyof any = string>
  extends ComponentClass<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: {
    groupId: GroupId;
    label: string;
  };
}
export type HvFlowNodeComponentType<GroupId extends keyof any = string> =
  | HvFlowNodeComponentClass<GroupId>
  | HvFlowNodeFunctionComponent<GroupId>;
export type HvFlowNodeTypes<GroupId extends keyof any = string> = {
  [key: string]: HvFlowNodeComponentType<GroupId>;
};

/** Node groups */
export interface HvFlowNodeGroup {
  label: string;
  description?: string;
  color?: HvColorAny;
  icon?: React.ReactNode;
}
export type HvFlowNodeGroups<GroupId extends keyof any = string> = Record<
  GroupId,
  HvFlowNodeGroup
>;
