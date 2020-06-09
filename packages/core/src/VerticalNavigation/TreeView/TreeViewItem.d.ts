import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { SyntheticEvent } from "react";

export type HvVerticalNavigationTreeViewItemClassKey =
  | "node"
  | "content"
  | "group"
  | "disabled"
  | "collapsed"
  | "expanded"
  | "selectable"
  | "unselectable"
  | "selected"
  | "unselected"
  | "contentFocused"
  | " contentFocusDisabled";

export interface HvVerticalNavigationTreeViewItemProps
  extends StandardProps<
    React.HTMLAttributes<HTMLUListElement>,
    HvVerticalNavigationTreeViewItemClassKey
  > {
  /**
   * Is the node disabled.
   */
  disabled?: boolean;
  /**
   * Can the node be selected.
   */
  selectable?: boolean;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The icon to display next to the node's label.
   */
  icon?: React.ReactNode;
  /**
   * The item label.
   */
  label: React.ReactNode;
  /**
   * The node payload.
   */
  // eslint-disable-next-line
  payload: any;
  /**
   * @ignore
   */
  onClick: (event: React.SyntheticEvent) => void;
}

export default function HvVerticalNavigationTreeItemView(
  props: HvVerticalNavigationTreeViewItemProps
): JSX.Element | null;
