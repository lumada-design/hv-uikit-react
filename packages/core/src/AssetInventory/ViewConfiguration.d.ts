import React, { FormEvent } from "react";
import { Action } from "../Actions";

export interface ViewConfiguration {
  /**
   * Callback evoked in the selection of an element.
   */
  onSelection?: (event: FormEvent<HTMLDivElement>) => void | undefined;
  /**
   * Defines if the view allows selections.
   */
  isSelectable?: boolean;
  /**
   * The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions?: number;
  /**
   * List of actions to be passed to the view elements.
   */
  actions?: React.ReactNode | Action[];
  /**
   * The callback function ran when an action is triggered, receiving ´action´ as param.
   */
  actionsCallback?: (id: string, action: Action) => void;
}
