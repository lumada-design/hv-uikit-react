import { CardActionsProps, StandardProps } from "@material-ui/core";
import { HvActionsGenericCommonProps } from "../../ActionsGeneric";
import { HvCheckBoxProps } from "../../CheckBox";

export interface HvCardFooterCommonProps extends HvActionsGenericCommonProps {
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment?: "left" | "right";
  /**
   *  `true` if the card should have a checkbox in the footer to be selectable `false` if it is not required.
   */
  isSelectable?: boolean;
}

export interface HvCardFooterProps
  extends StandardProps<CardActionsProps, HvCardFooterClassKey>,
    HvCardFooterCommonProps {
  /**
   *  The function that will be executed when the card is selected.
   */
  onChange?: (event: React.FormEvent<HTMLDivElement>) => void | undefined;
  /**
   * Extra properties to be passed to the checkbox component in the footer.
   */
  checkboxProps: HvCheckBoxProps;
}

export type HvCardFooterClassKey = "root" | "leftContainer" | "rightContainer";

export default function HvCardFooter(props: HvCardFooterProps): JSX.Element | null;
