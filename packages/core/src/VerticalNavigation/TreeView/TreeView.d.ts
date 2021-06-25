import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvVerticalNavigationTreeViewClassKey = "root";

export interface HvVerticalNavigationTreeViewPropsBase
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
   * Enables selection.
   * @default false
   */
  selectable?: boolean;
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;
  /**
   * Expanded nodes' ids.
   */
  expanded?: string[];
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   * @default []
   */
  defaultExpanded?: string[];
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onToggle?: (event: React.SyntheticEvent, nodeIds: string[]) => void;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
}

interface MultiSelectTreeViewProps extends HvVerticalNavigationTreeViewPropsBase {
  /**
   * The selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string[];
  /**
   * When uncontrolled, defines the initial selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string[];
  /**
   * Enables the simultaneous selection of multiple items.
   * @default false
   */
  multiSelect?: true;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onChange?: (event: React.SyntheticEvent, nodeIds: string[]) => void;
}

interface SingleSelectTreeViewProps extends HvVerticalNavigationTreeViewPropsBase {
  /**
   * The selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string;
  /**
   * When uncontrolled, defines the initial selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  defaultSelected?: string;
  /**
   * Enables the simultaneous selection of multiple items.
   * @default false
   */
  multiSelect?: false;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onChange?: (event: React.SyntheticEvent, nodeIds: string) => void;
}

export type HvVerticalNavigationTreeViewProps =
  | SingleSelectTreeViewProps
  | MultiSelectTreeViewProps;

export default function HvVerticalNavigationTreeView(
  props: HvVerticalNavigationTreeViewProps
): JSX.Element | null;
