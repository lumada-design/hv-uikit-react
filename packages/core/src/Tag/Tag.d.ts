import { StandardProps } from "@material-ui/core";
import { HvButtonProps } from "../Button";

export type HvTagButtonClassKey = "";

export type HvTagButtonProps = StandardProps<HvButtonProps, HvTagButtonClassKey>;

export type HvTagClassKey =
  | "root"
  | "chipRoot"
  | "focusVisible"
  | "primaryButton"
  | "label"
  | "tagButton"
  | "deleteIcon"
  | "disabledDeleteIcon"
  | "titleOverflow"
  | "categorical"
  | "categoricalFocus"
  | "disabled"
  | "categoricalDisabled"
  | "semanticTextColor"
  | "categoricalTextColor"
  | "focusVisible"
  | "primaryButton"
  | "categoricalFocus";

export interface HvTagProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTagClassKey> {
  /**
   * The label of the tag element.
   *
   */
  label?: React.ReactNode;
  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * The type of the tag element.
   *
   * A tag can be of semantic or categoric type
   */
  type: "semantic" | "categorical";

  /**
   * Background color to be applied to the tag
   */
  color?: string;
  /**
   * Icon used to customize the delete icon in the Chip element
   */
  deleteIcon?: React.ReactNode;
  /**
   * The callback fired when the delete icon is pressed.
   * This function has to be provided to the component,
   * in order to render the delete icon
   */
  onDelete?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback triggered when any item is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Role to be applied to the clickable element
   */
  role?: string;
  /**
   * Aria properties to apply to delete button in tag
   */
  deleteButtonArialLabel?: string;
  /**
   * Props to apply to delete button
   */
  deleteButtonProps?: HvTagButtonProps;
}

export default function HvTag(props: HvTagProps): JSX.Element | null;
