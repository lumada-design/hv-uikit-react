import React, { MouseEvent } from "react";
import { StandardProps } from "@mui/material";

export interface NavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
}

export type HvHeaderNavigationClassKey = "root";

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
   * href - the url for navigation.
   * target - the behavior when opening a link.
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

export default function HvHeaderNavigation(props: HvHeaderNavigationProps): JSX.Element | null;
