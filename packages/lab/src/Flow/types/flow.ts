import React, { ComponentClass, FC } from "react";
import { Node, NodeProps, ReactFlowInstance } from "reactflow";
import {
  HvActionGeneric,
  HvActionsGenericProps,
  HvSliderProps,
} from "@hitachivantara/uikit-react-core";
import { HvColorAny } from "@hitachivantara/uikit-styles";

// Node types

type NodeExtras<GroupId extends keyof any = string, NodeData = any> = {
  meta?: HvFlowNodeTypeMeta<GroupId, NodeData>;
};

/** HvFlowNode component type. @extends React.FC */
export interface HvFlowNodeFC<
  GroupId extends keyof any = string,
  NodeData = any
> extends FC<NodeProps<NodeData>>,
    NodeExtras<GroupId, NodeData> {}

export interface HvFlowNodeComponentClass<
  GroupId extends keyof any = string,
  NodeData = any
> extends ComponentClass<NodeProps>,
    NodeExtras<GroupId, NodeData> {}

export type HvFlowNodeComponentType<
  GroupId extends keyof any = string,
  NodeData = any
> =
  | HvFlowNodeComponentClass<GroupId, NodeData>
  | HvFlowNodeFC<GroupId, NodeData>;

export type HvFlowNodeTypes<
  GroupId extends keyof any = string,
  NodeData = any
> = Record<string, HvFlowNodeComponentType<GroupId, NodeData>>;

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

/** Metadata used on the `HvFlowSidebar` component to group the node */
export type HvFlowNodeTypeMeta<
  GroupId extends keyof any = string,
  NodeData = any
> = {
  label: string;
  groupId?: GroupId;
  data?: NodeData;
};

export interface HvFlowNodeMeta {
  label: string;
  inputs?: (HvFlowNodeInput | HvFlowNodeInputGroup)[];
  outputs?: (HvFlowNodeOutput | HvFlowNodeOutputGroup)[];
}

export interface HvFlowNodeLabelActions
  extends Pick<
    Partial<HvActionsGenericProps>,
    "actions" | "maxVisibleActions"
  > {
  /** Where to place the actions relatively to the label. @default left */
  actionsPlacement?: "left" | "right";
  /** The button variant for all actions. @default secondaryGhost */
  actionsButtonVariant?: HvActionsGenericProps["variant"];
  /** Whether the actions should be all icon buttons when visible. */
  actionsIconOnly?: boolean;
  /** The callback called when an action is triggered. */
  actionsCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric,
    item:
      | HvFlowNodeInput
      | HvFlowNodeInputGroup
      | HvFlowNodeOutput
      | HvFlowNodeOutputGroup
  ) => void;
}

export interface HvFlowNodeInput extends HvFlowNodeLabelActions {
  id?: string;
  label: React.ReactNode;
  isMandatory?: boolean;
  accepts?: string[];
  maxConnections?: number;
}

export interface HvFlowNodeInputGroup extends HvFlowNodeLabelActions {
  id?: string;
  label: React.ReactNode;
  inputs: HvFlowNodeInput[];
  defaultInputsActions?: HvFlowNodeLabelActions;
}

export interface HvFlowNodeOutput extends HvFlowNodeLabelActions {
  id?: string;
  label: React.ReactNode;
  isMandatory?: boolean;
  provides?: string;
  maxConnections?: number;
}

export interface HvFlowNodeOutputGroup extends HvFlowNodeLabelActions {
  id?: string;
  label: React.ReactNode;
  outputs: HvFlowNodeOutput[];
  defaultOutputsActions?: HvFlowNodeLabelActions;
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

export interface HvFlowNodeAction extends Omit<HvActionGeneric, "iconOnly"> {
  callback?: (node: Node) => void;
}

export type HvFlowBuiltInAction = "delete" | "duplicate";

export type HvFlowBuiltInActions = Omit<HvFlowNodeAction, "id" | "callback"> & {
  id: HvFlowBuiltInAction;
};

export type HvFlowNodeMetaRegistry = Record<string, HvFlowNodeMeta>;

export type HvFlowInstance<NodeData = any, EdgeData = any> = ReactFlowInstance<
  NodeData,
  EdgeData
>;
