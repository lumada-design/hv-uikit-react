import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvButtonCategories } from "../Button";

export type ActionGeneric = {
  id: string;
  label: string;
  iconCallback?: (params: { isDisabled?: boolean }) => React.ReactNode;
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

export interface HvActionsGenericProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsGenericClassKey>,
    HvActionsGenericCommonProps {}

export type HvActionsGenericClassKey =
  | "button"
  | "actionContainer"
  | "dropDownMenu"
  | "dropDownMenuButton"
  | "dropDownMenuButtonSelected";

export default function HvActionsGeneric(props: HvActionsGenericProps): JSX.Element | null;
