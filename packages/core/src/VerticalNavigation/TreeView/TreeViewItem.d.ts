import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvVerticalNavigationTreeViewItemClassKey = "root";

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
  payload: any;
  /**
   * @ignore
   */
  onChange: (event: any) => void;
}

export default function HvVerticalNavigationTreeItemView(
  props: HvVerticalNavigationTreeViewItemProps
): JSX.Element | null;
