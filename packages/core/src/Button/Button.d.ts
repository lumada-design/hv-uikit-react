import { ButtonProps, StandardProps } from "@mui/material";

export type HvButtonCategories = "primary" | "secondary" | "ghost" | "semantic";

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

export interface HvButtonProps extends StandardProps<ButtonProps, HvButtonClassKey> {
  /**
   * Whether the Button is an icon-only button.
   */
  icon?: boolean;
  /**
   * Category of button to use
   */
  category?: HvButtonCategories;
  /**
   * Whether the Button is in a selected state
   */
  selected?: boolean;

  /**
   * Defines the default colors of the button are forced into the icon.
   */
  overrideIconColors?: boolean;

  // this prop is not being found by typescript extend chain. Consider removing this in the future
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `table`.
   *
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvButton(props: HvButtonProps): JSX.Element | null;
