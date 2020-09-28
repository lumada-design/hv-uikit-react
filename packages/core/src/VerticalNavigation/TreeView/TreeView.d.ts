import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvVerticalNavigationTreeViewClassKey = "root";

export interface HvVerticalNavigationTreeViewProps
  extends StandardProps<
    React.HTMLAttributes<HTMLUListElement>,
    HvVerticalNavigationTreeViewClassKey,
    "onChange"
  > {
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode?: "treeview" | "navigation";
  /**
   * Can nodes be selected.
   */
  selectable?: boolean;
  /**
   * Receives the id of an item present in the list and selects it.
   */
  selected?: string;
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;
  /**
   * Callback fired when a tree item is selected.
   *
   * @param {array} nodeId The id of the selected node.
   */
  onChange?: (nodeId: string) => void;
}

export default function HvVerticalNavigationTreeView(
  props: HvVerticalNavigationTreeViewProps
): JSX.Element | null;
