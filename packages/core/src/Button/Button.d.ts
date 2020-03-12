import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core";

export interface HvButtonProps extends StandardProps<ButtonProps, HvButtonClassKey> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;

  /**
   * Category of button to use
   */
  category?: "primary" | "secondary" | "ghost" | "ghostSecondary" | "semantic" | "icon";

  /**
   * The content of the button.
   * @required
   */
  children: React.ReactNode;

  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * The function executed when the button is pressed.
   * @param event React.MouseEvent<HTMLButtonElement>
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;

  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
}

export type HvButtonClassKey =
  | "root"
  | "rootIcon"
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
  | "ghost"
  | "ghostDisabled"
  | "ghostSecondary"
  | "ghostSecondaryDisabled"
  | "semantic"
  | "semanticDisabled"
  | "startIcon";

export default function HvButton(props: HvButtonProps): JSX.Element | null;
