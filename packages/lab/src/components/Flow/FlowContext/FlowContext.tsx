import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

import {
  HvFlowDefaultActions,
  HvFlowNodeGroups,
  HvFlowNodeTypes,
} from "../types";

export interface HvFlowContextValue<NodeGroups extends keyof any = string> {
  /** Flow nodes types. */
  nodeTypes?: HvFlowNodeTypes<NodeGroups>;
  /** Flow nodes groups. */
  nodeGroups?: HvFlowNodeGroups<NodeGroups>;
  /** Flow nodes groups expanded on sidebar. */
  expandedNodeGroups?: string[];
  /** Flow default actions. */
  defaultActions?: HvFlowDefaultActions[];
  /** Function to set `expandedNodeGroups`. */
  setExpandedNodeGroups?: Dispatch<SetStateAction<string[]>>;
}

export const HvFlowContext = createContext<HvFlowContextValue>({});

export interface HvFlowProviderProps<NodeGroups extends keyof any = string> {
  /** Flow nodes types. */
  nodeTypes?: HvFlowContextValue<NodeGroups>["nodeTypes"];
  /** Flow nodes groups. */
  nodeGroups?: HvFlowContextValue<NodeGroups>["nodeGroups"];
  /** Flow default actions. */
  defaultActions?: HvFlowDefaultActions[];
  /** Children. */
  children?: React.ReactNode;
}

export const HvFlowProvider = ({
  nodeGroups,
  nodeTypes,
  defaultActions,
  children,
}: HvFlowProviderProps) => {
  const [expandedNodeGroups, setExpandedNodeGroups] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      nodeTypes,
      nodeGroups,
      defaultActions,
      expandedNodeGroups,
      setExpandedNodeGroups,
    }),
    [nodeTypes, nodeGroups, defaultActions, expandedNodeGroups]
  );

  return (
    <HvFlowContext.Provider value={value}>{children}</HvFlowContext.Provider>
  );
};
