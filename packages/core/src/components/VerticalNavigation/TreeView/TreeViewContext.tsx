import { createContext } from "react";

export type NavigationMode = "treeview" | "navigation" | "slider";

const TreeViewControlContext = createContext<TreeViewControlContextValue>({});
TreeViewControlContext.displayName = "TreeViewControlContext";

const TreeViewStateContext = createContext<TreeviewStateContextValue>({});
TreeViewStateContext.displayName = "TreeViewStateContext";

export { TreeViewControlContext, TreeViewStateContext };

interface TreeviewStateContextValue {
  isExpanded?: (id: any) => boolean;
  isSelected?: (id: any) => boolean;
  isFocused?: (id: any) => boolean;
  isDisabled?: (id: any) => boolean;
  isChildSelected?: (id: any) => boolean;
}

interface TreeViewControlContextValue {
  treeId?: any;
  mode?: NavigationMode;
  collapsible?: boolean;
  toggleExpansion?: (event, value?) => void;
  multiSelect?: boolean;
  selectNode?: (event, id, multiple?) => boolean;
  selectRange?: (event: any, nodes: any, stacked?: boolean) => void;
  disabledItemsFocusable?: boolean;
  registerNode?: (node) => void;
  unregisterNode?: (id) => void;
  mapFirstChar?: (id, firstChar) => void;
  unMapFirstChar?: (id, firstChar?) => void;
  focus?: (id, firstChar) => void;
}
