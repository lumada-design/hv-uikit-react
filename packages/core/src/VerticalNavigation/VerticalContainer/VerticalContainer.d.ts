import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvVerticalNavigationContainerClassKey =
  | "root"
  | "fixed"
  | "relative"
  | "absolute"
  | "static"
  | "withAnchorBar"
  | "verticalContainer"
  | "anchorBar"
  | "button"
  | "separator"
  | "contentContainer";

export interface HvVerticalNavigationContainerProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvVerticalNavigationContainerClassKey
  > {
  /**
   * Position of the component.
   */
  position?: "static" | "relative" | "fixed" | "absolute";

  /**
   * Defines if a anchor bar is visible,
   */
  isAnchorBarVisible?: boolean;
  /**
   * Is the navigation open.
   */
  isOpen?: boolean;
  /**
   * Aria-label for the button.
   */
  buttonAriaLabel?: string;
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback?: (open: boolean) => void;
  /**
   * Defines if the content pane should close when losing focus / clicking outside.
   */
  closeOnExit?: boolean;
}

export default function HvVerticalNavigationContainer(
  props: HvVerticalNavigationContainerProps
): JSX.Element | null;
