import React, { FormEvent } from "react";
import { HvActionsCommonProps } from "../Actions";

export interface ViewConfiguration extends HvActionsCommonProps {
  /**
   * Callback evoked in the selection of an element.
   */
  onSelection?: (event: FormEvent<HTMLDivElement>) => void | undefined;
  /**
   * Defines if the view allows selections.
   */
  isSelectable?: boolean;
}
