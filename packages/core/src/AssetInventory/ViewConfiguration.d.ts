import { FormEvent } from "react";
import { HvActionsGenericCommonProps } from "../ActionsGeneric";

export interface ViewConfiguration extends HvActionsGenericCommonProps {
  /**
   * Callback evoked in the selection of an element.
   */
  onSelection?: (event: FormEvent<HTMLDivElement>) => void | undefined;
  /**
   * Defines if the view allows selections.
   */
  isSelectable?: boolean;
}
