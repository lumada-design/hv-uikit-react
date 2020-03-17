import React, { FormEvent } from "react";
import { CardActionsProps, StandardProps } from "@material-ui/core";
import { Action } from "../../Actions";

export interface HvCardFooterProps extends StandardProps<CardActionsProps, HvCardFooterClassKey> {
  /**
   *  Used to define a string that labels the checkbox element.
   */
  checkboxAriaLabel?: string;
  /**
   *  Establishes relationships between the checkbox and their label(s), and its value should be one or more element IDs.
   */
  checkboxAriaLabelledBy?: string;
  /**
   *  Used to indicate the IDs of the elements that describe the checkbox.
   */
  checkboxAriaDescribedBy?: string;
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon}´
   */
  actions?: React.ReactNode | Action[];
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: (id: string, action: Action) => void;
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment?: "left" | "right";
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions?: number;
  /**
   *  ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
   */
  isSelectable?: boolean;
  /**
   *  The function that will be executed when the card is selected.
   */
  onChange?: (event: FormEvent<HTMLDivElement>) => void | undefined;
  /**
   *  The value the checkbox in the footer will return when selected.
   */
  checkboxValue?: string;
  /**
   *  The label for the checkbox in the footer of the card.
   */
  checkboxLabel?: string;
  /**
   *  ´true´ if the checkbox is selected or ´false´ if not selected.
   *
   *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checkboxSelected?: boolean;
  /**
   *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
   */
  checkboxIndeterminate?: boolean;
  /**
   *  Width applicable to the action container, to handle an issue Safari has when using css flex:
   *  It resizes descendant divs, unless a width is forced
   */
  actionItemWidth?: number;
}

export type HvCardFooterClassKey = "root" | "leftContainer" | "rightContainer";

export default function HvCardFooter(props: HvCardFooterProps): JSX.Element | null;
