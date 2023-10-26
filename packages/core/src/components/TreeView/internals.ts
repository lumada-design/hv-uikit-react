import { useTreeViewContext } from "@mui/x-tree-view/internals/TreeViewProvider/useTreeViewContext";
import { TreeViewProvider } from "@mui/x-tree-view/internals/TreeViewProvider";
import {
  DescendantProvider,
  TreeItemDescendant,
  useDescendant,
} from "@mui/x-tree-view/internals/TreeViewProvider/DescendantProvider";
import {
  DEFAULT_TREE_VIEW_PLUGINS,
  DefaultTreeViewPlugins,
  DefaultTreeViewPluginParameters,
} from "@mui/x-tree-view/internals/plugins/defaultPlugins";
import { useTreeView } from "@mui/x-tree-view/internals/useTreeView";

export type {
  DefaultTreeViewPlugins as HvTreeViewPlugins,
  DefaultTreeViewPluginParameters as HvTreeViewPluginParameters,
  TreeItemDescendant,
};

export const HV_TREE_VIEW_PLUGINS = [...DEFAULT_TREE_VIEW_PLUGINS] as const;

export {
  DescendantProvider,
  TreeViewProvider,
  useDescendant,
  useTreeView,
  useTreeViewContext,
};
