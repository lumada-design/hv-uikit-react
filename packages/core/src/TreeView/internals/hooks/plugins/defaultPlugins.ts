import { ConvertPluginsIntoSignatures } from "../../types";
import {
  useTreeViewContextValueBuilder,
  UseTreeViewContextValueBuilderParameters,
} from "./useTreeViewContextValueBuilder";
import {
  useTreeViewExpansion,
  UseTreeViewExpansionParameters,
} from "./useTreeViewExpansion";
import {
  useTreeViewFocus,
  UseTreeViewFocusParameters,
} from "./useTreeViewFocus";
import { useTreeViewKeyboardNavigation } from "./useTreeViewKeyboardNavigation";
import {
  useTreeViewNodes,
  UseTreeViewNodesParameters,
} from "./useTreeViewNodes";
import {
  useTreeViewSelection,
  UseTreeViewSelectionParameters,
} from "./useTreeViewSelection";

export const DEFAULT_TREE_VIEW_PLUGINS = [
  useTreeViewNodes,
  useTreeViewExpansion,
  useTreeViewSelection,
  useTreeViewFocus,
  useTreeViewKeyboardNavigation,
  useTreeViewContextValueBuilder,
] as const;

export type DefaultTreeViewPlugins = ConvertPluginsIntoSignatures<
  typeof DEFAULT_TREE_VIEW_PLUGINS
>;

// We can't infer this type from the plugin, otherwise we would lose the generics.
export interface DefaultTreeViewPluginParameters<
  Multiple extends boolean | undefined,
> extends UseTreeViewNodesParameters,
    UseTreeViewExpansionParameters,
    UseTreeViewFocusParameters,
    UseTreeViewSelectionParameters<Multiple>,
    UseTreeViewContextValueBuilderParameters {}
