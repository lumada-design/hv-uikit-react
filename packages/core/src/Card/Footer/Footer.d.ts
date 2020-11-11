import { CardActionsProps, StandardProps } from "@material-ui/core";
import { HvActionsCommonProps, HvActionsProps } from "../../Actions";
import { HvCheckBoxProps } from "../../Selectors/CheckBox";

export interface HvCardFooterCommonProps extends HvActionsCommonProps {
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment?: "left" | "right";
  /**
   *  ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
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
  /**
   * Properties to be passed onto the Actions component, the values of the object are equivalent to the
   * HvActions API.
   */
  actionsProps?: HvActionsProps;
}

export type HvCardFooterClassKey = "root" | "leftContainer" | "rightContainer";

export default function HvCardFooter(props: HvCardFooterProps): JSX.Element | null;
