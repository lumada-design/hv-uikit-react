import React, { MouseEvent } from "react";
import { StandardProps } from "@material-ui/core";

export interface NavigationItemProp {
  id: string;
  label: string;
  path?: string;
}

export interface HvHeaderNavigationProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvHeaderNavigationClassKey,
    "onClick"
  > {
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  data: NavigationItemProp[];
  /**
   * Menu item id selected.
   */
  selected?: string;
  /**
   * Callback triggered when any item is clicked.
   */
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
}

export type HvHeaderNavigationClassKey = "root";

export default function HvHeaderNavigation(props: HvHeaderNavigationProps): JSX.Element | null;
