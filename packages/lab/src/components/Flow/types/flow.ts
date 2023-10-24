import { ComponentClass, FunctionComponent } from "react";
import { HvActionGeneric } from "@hitachivantara/uikit-react-core";
import { HvColorAny } from "@hitachivantara/uikit-styles";
import { NodeProps } from "reactflow";

/** Node types */
export interface HvFlowNodeFunctionComponent<
  GroupId extends keyof any = string,
  NodeData = any
> extends FunctionComponent<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: HvFlowNodeMeta<GroupId, NodeData>;
}
export interface HvFlowNodeComponentClass<
  GroupId extends keyof any = string,
  NodeData = any
> extends ComponentClass<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: HvFlowNodeMeta<GroupId, NodeData>;
}
export type HvFlowNodeComponentType<
  GroupId extends keyof any = string,
  NodeData = any
> =
  | HvFlowNodeComponentClass<GroupId, NodeData>
  | HvFlowNodeFunctionComponent<GroupId, NodeData>;

export type HvFlowNodeTypes<
  GroupId extends keyof any = string,
  NodeData = any
> = {
  [key: string]: HvFlowNodeComponentType<GroupId, NodeData>;
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

export type HvFlowNodeMeta<
  GroupId extends keyof any = string,
  NodeData = any
> = {
  label: string;
  groupId: GroupId;
  inputs?: HvFlowNodeInput[];
  outputs?: HvFlowNodeOutput[];
  data?: NodeData;
};

export type HvFlowNodeInput = {
  label: string;
  isMandatory?: boolean;
  accepts?: string[];
};

export type HvFlowNodeOutput = {
  label: string;
  isMandatory?: boolean;
  provides?: string;
};

export type HvFlowNodeParam = {
  id: string;
  type: "text" | "select";
  label: string;
  options?: string[];
  value?: string;
};

export type HvFlowDefaultAction = "delete" | "duplicate";

export type HvFlowDefaultActions = Omit<HvActionGeneric, "id"> & {
  id: HvFlowDefaultAction;
};
