import { StandardProps } from "@material-ui/core";

export type HvVerticalNavigationClassKey = "root" | "noCollapse" | "legacyMode";

export interface HvVerticalNavigationProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, HvVerticalNavigationClassKey> {
  /**
   * Sets if the navigation should have a button to hide itself.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  isCollapsable?: boolean;
  /**
   * Is the navigation open.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  isOpen?: boolean;
  /**
   * Callback when the navigation toggles between open and close.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  toggleOpenCallback?: (open: boolean) => void;
  /**
   * Position of the component.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  position?: "static" | "relative" | "fixed" | "absolute";
  /**
   * Defines if the navigation should close when losing focus / clicking outside.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  closeOnExit?: boolean;
  /**
   * Aria-label for the button that opens the vertical navigation.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  buttonAriaLabel?: string;
}

export default function HvVerticalNavigation(props: HvVerticalNavigationProps): JSX.Element | null;
