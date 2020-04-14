import * as React from "react";
import { StandardProps } from "@material-ui/core";

interface NavigationItemProp {
  id: string;
  label: string;
}

export interface HvHeaderNavigationProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvHeaderNavigationClassKey> {
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
}

export type HvHeaderNavigationClassKey = "root";

export default function HvHeaderNavigation(props: HvHeaderNavigationProps): JSX.Element | null;
