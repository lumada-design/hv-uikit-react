import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvButtonCategories } from "../Button";

export type Action = {
  id: string;
  label: string;
  iconCallback?: (params: { isDisabled?: boolean }) => React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

export interface HvActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsClassKey> {
  /**
   * Button category.
   */
  category?: HvButtonCategories;
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon, disabled}´
   */
  actions: React.ReactNode | Action[];
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback?: (id: string, action: Action) => void;
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions?: number;
}

export type HvActionsClassKey = "button" | "actionContainer" | "dropDownMenu" | "dropDownMenuIcon";

export default function HvActions(props: HvActionsProps): JSX.Element | null;
