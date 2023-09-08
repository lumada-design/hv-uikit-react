import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { HvFlowNodeGroups, HvFlowNodeTypes } from "../types";

export interface HvFlowContextValue<NodeGroups extends keyof any = string> {
  /** Flow nodes types. */
  nodeTypes?: HvFlowNodeTypes<NodeGroups>;
  /** Flow nodes groups. */
  nodeGroups?: HvFlowNodeGroups<NodeGroups>;
  /** Flow nodes groups expanded on sidebar. */
  expandedNodeGroups?: string[];
  /** Function to set `expandedNodeGroups`. */
  setExpandedNodeGroups?: Dispatch<SetStateAction<string[]>>;
}

export const HvFlowContext = createContext<HvFlowContextValue>({});

export interface HvFlowProviderProps<NodeGroups extends keyof any = string> {
  /** Flow nodes types. */
  nodeTypes?: HvFlowContextValue<NodeGroups>["nodeTypes"];
  /** Flow nodes groups. */
  nodeGroups?: HvFlowContextValue<NodeGroups>["nodeGroups"];
  /** Children. */
  children?: React.ReactNode;
}

export const HvFlowProvider = ({
  nodeGroups,
  nodeTypes,
  children,
}: HvFlowProviderProps) => {
  const [expandedNodeGroups, setExpandedNodeGroups] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      nodeTypes,
      nodeGroups,
      expandedNodeGroups,
      setExpandedNodeGroups,
    }),
    [nodeGroups, nodeTypes, expandedNodeGroups]
  );

  return (
    <HvFlowContext.Provider value={value}>{children}</HvFlowContext.Provider>
  );
};

export const useFlowContext = () => useContext(HvFlowContext);
