import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvButtonCategories } from "../Button";

export type ActionGeneric = {
  id: string;
  label: string;
  icon?: React.ReactNode | ((params: { isDisabled?: boolean }) => React.ReactNode);
  disabled?: boolean;
};

export interface HvActionsGenericCommonProps {
  /**
   * Button category.
   */
  category?: HvButtonCategories;
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions `{id, label, icon, disabled}`
   */
  actions?: React.ReactNode | ActionGeneric[];
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback?: (event: Event, id: string, action: ActionGeneric) => void;
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions?: number;
}

export type HvActionsGenericClassKey =
  | "button"
  | "actionContainer"
  | "dropDownMenu"
  | "dropDownMenuButton"
  | "dropDownMenuButtonSelected";

export interface HvActionsGenericProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsGenericClassKey>,
    HvActionsGenericCommonProps {}

export default function HvActionsGeneric(props: HvActionsGenericProps): JSX.Element | null;
