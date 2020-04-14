import React from "react";

const TreeViewControlContext = React.createContext({});
TreeViewControlContext.displayName = "TreeViewControlContext";

const TreeViewStateContext = React.createContext({});
TreeViewStateContext.displayName = "TreeViewStateContext";

export { TreeViewControlContext, TreeViewStateContext };
