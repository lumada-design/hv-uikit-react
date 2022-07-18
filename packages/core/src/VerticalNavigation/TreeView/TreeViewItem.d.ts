import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvVerticalNavigationTreeViewItemClassKey =
  | "node"
  | "content"
  | "group"
  | "disabled"
  | "expandable"
  | "collapsed"
  | "expanded"
  | "selectable"
  | "unselectable"
  | "selected"
  | "unselected"
  | "focused";

export interface HvVerticalNavigationTreeViewItemProps
  extends StandardProps<
    React.HTMLAttributes<HTMLLIElement>,
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
   * The url for the link.
   */
  href: string;
  /**
   * The behavior when opening a link.
   */
  target: string;
  /**
   * The node payload.
   */
  // eslint-disable-next-line
  payload: any;
  /**
   * @ignore
   */
  onClick: (event: React.SyntheticEvent) => void;
  /**
   * @ignore
   */
  onMouseDown: (event: React.SyntheticEvent) => void;
  /**
   * @ignore
   */
  onFocus: (event: React.SyntheticEvent) => void;
}

export default function HvVerticalNavigationTreeItemView(
  props: HvVerticalNavigationTreeViewItemProps
): JSX.Element | null;
