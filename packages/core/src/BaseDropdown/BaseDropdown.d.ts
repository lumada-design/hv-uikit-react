import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { PopperProps } from "@material-ui/core/Popper";

export interface HvBaseDropdownProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBaseDropdownClassKey> {
  /**
   * Header placeholder.
   */
  placeholder?: string | React.ReactNode;
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled?: boolean;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps?: Partial<PopperProps>;
  /**
   * Node to be rendered.
   */
  children?: React.ReactNode;
  /**
   * Placement of the dropdown.
   */
  placement?: "left" | "right";
  /**
   * Replacement for the header component.
   */
  component?: React.ReactNode;
  /**
   * Adornment to replace the default arrows.
   */
  adornment?: React.ReactNode;
  /**
   * When dropdown changes the expanded state.
   */
  onToggle?: (event: Event) => void;
  /**
   * When user click outside the open container.
   */
  onClickOutside?: (event: Event) => void;
  /**
   * When expanded dropdown changes position.
   */
  onFlip?: (flipped: boolean) => void;
}

export type HvBaseDropdownClassKey =
  | "root"
  | "header"
  | "headerOpen"
  | "headerOpenUp"
  | "headerOpenDown"
  | "headerDisabled"
  | "arrow"
  | "selection"
  | "truncate"
  | "selectionDisabled"
  | "panel"
  | "inputExtensionOpen"
  | "inputExtensionLeftPosition"
  | "inputExtensionOpenShadow"
  | "inputExtensionFloatRight"
  | "inputExtensionFloatLeft";

export default function HvBaseDropdown(props: HvBaseDropdownProps): JSX.Element | null;
