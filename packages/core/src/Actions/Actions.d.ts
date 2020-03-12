import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type Action = {
  id: string;
  label: string;
  iconCallback?: () => React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

export interface HvActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvActionsClassKey> {
  /**
   *   A Jss Object used to override or extend the styles applied to the actions.
   */
  classes: {
    /**
     * Styles applied to the visible buttons.
     */
    button?: string;
    /**
     * Styles applied to the action container wrapper.
     */
    actionContainer?: string;
    /**
     * Styles applied to the DropDownMenu component.
     */
    dropDownMenu?: string;
    /**
     * Styles applied to the DropDownMenu icon.
     */
    dropDownMenuIcon?: string;
  };
  /**
   * Component identifier.
   */
  id?: string;
  /**
   * Button category.
   */
  category?: "primary" | "secondary" | "ghost" | "ghostSecondary" | "semantic";
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

type HvActionsClassKey = "button" | "actionContainer" | "dropDownMenu" | "dropDownMenuIcon";

export default function HvActions(props: HvActionsProps): JSX.Element | null;
