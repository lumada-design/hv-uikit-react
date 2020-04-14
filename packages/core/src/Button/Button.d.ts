import { StandardProps, ButtonProps } from "@material-ui/core";

export type HvButtonCategories =
  | "primary"
  | "secondary"
  | "ghost"
  | "ghostSecondary"
  | "semantic"
  | "icon";

export interface HvButtonProps extends StandardProps<ButtonProps, HvButtonClassKey> {
  /**
   * Category of button to use
   */
  category?: HvButtonCategories;
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
