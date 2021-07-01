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
  /**
   * Any other properties.
   */
  [otherProperty: string]: any;
}

export type HvNavigationClassKey = "root" | "list" | "listItem";

export interface HvVerticalNavigationNavigationProps
  extends StandardProps<
    React.HTMLAttributes<HTMLElement>,
    HvNavigationClassKey,
    "onClick" | "onChange"
  > {
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode?: "treeview" | "navigation";
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;

  /**
   * The ID of the selected page.
   */
  selected?: string;
  /**
   * When uncontrolled, defines the initial selected page ID.
   */
  defaultSelected?: string;
  /**
   * Callback fired when a navigation item is selected.
   *
   * @param {object} event The event source of the callback.
   * @param {object} page The data of the selected page.
   */
  onChange?: (event: React.SyntheticEvent, selectedItem: NavigationData) => void;

  /**
   * Expanded nodes' ids.
   */
  expanded?: string[];
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   *
   * It also supports `true` for starting with all nodes expanded.
   * With `false` all nodes will be collapsed.
   *
   * By default it expands the needed nodes to display the current selection, if any.
   */
  defaultExpanded?: string[] | boolean;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onToggle?: (event: React.SyntheticEvent, nodeIds: string[]) => void;

  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * data - sub-menu items
   */
  data: NavigationData[];

  /**
   * Callback triggered when any item is clicked.
   *
   *  @deprecated use `onChange` for selection and `onToggle` for node expansion/collapse.
   */
  onClick?: (event: MouseEvent, selectedItem: NavigationData) => void;

  /**
   * The root element (nav) aria label.
   *
   *  @deprecated Use directly the `aria-label` property instead.
   */
  label?: string;
}

export default function HvVerticalNavigationNavigation(
  props: HvVerticalNavigationNavigationProps
): JSX.Element | null;
