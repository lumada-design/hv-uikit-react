import React, { MouseEvent } from "react";
import { StandardProps } from "@material-ui/core";

export interface NavigationData {
  /**
   * the id to be applied to the root element.
   */
  id: string;
  /**
   * the label to be rendered on the menu item.
   */
  label: string;
  /**
   * Icon to be render.
   */
  icon?: React.ReactNode;
  /**
   * Data subset.
   */
  data?: NavigationData[];
}

export type HvNavigationClassKey = "root";

export interface HvVerticalNavigationNavigationProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvNavigationClassKey, "onClick"> {
  /**
   * Label.
   */
  label?: string;

  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  data?: NavigationData[];

  /**
   * Menu item id selected.
   */
  selected?: string;

  /**
   * Callback triggered when any item is clicked.
   */
  onClick?: (event: MouseEvent, selectedItem: NavigationData) => void;
}

export default function HvVerticalNavigationNavigation(
  props: HvVerticalNavigationNavigationProps
): JSX.Element | null;
