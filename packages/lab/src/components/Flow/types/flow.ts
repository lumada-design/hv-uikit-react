import { HvActionGeneric } from "@hitachivantara/uikit-react-core";
import { HvColorAny } from "@hitachivantara/uikit-styles";
import { ComponentClass, FunctionComponent } from "react";
import { NodeProps } from "reactflow";

/** Node types */
export interface HvFlowNodeFunctionComponent<GroupId extends keyof any = string>
  extends FunctionComponent<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: HvFlowNodeMeta<GroupId>;
}
export interface HvFlowNodeComponentClass<GroupId extends keyof any = string>
  extends ComponentClass<NodeProps> {
  /** Metadata used on the HvFlowSidebar component to group the node */
  meta?: HvFlowNodeMeta<GroupId>;
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

export type HvFlowNodeMeta<GroupId extends keyof any = string> = {
  label: string;
  groupId: GroupId;
  inputs?: HvFlowNodeInput[];
  outputs?: HvFlowNodeOutput[];
};

export type HvFlowNodeInput = {
  label: string;
  isMandatory?: boolean;
  accepts?: string[];
};

export type HvFlowNodeOutput = {
  label: string;
  isMandatory?: boolean;
  provides?: string[];
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
