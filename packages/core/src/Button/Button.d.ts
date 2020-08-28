import { ButtonProps, StandardProps } from "@material-ui/core";

export type HvButtonCategories = "primary" | "secondary" | "ghost" | "semantic";

export interface HvButtonProps extends StandardProps<ButtonProps, HvButtonClassKey> {
  /**
   * Whether the Button is an icon-only button.
   */
  icon: boolean;
  /**
   * Category of button to use
   */
  category?: HvButtonCategories;

  /**
   * Defines the default colors of the button are forced into the icon.
   */
  overrideIconColors?: boolean;
}

export type HvButtonClassKey =
  | "root"
  | "icon"
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
  | "ghost"
  | "ghostDisabled"
  | "semantic"
  | "semanticDisabled"
  | "startIcon";

export default function HvButton(props: HvButtonProps): JSX.Element | null;
