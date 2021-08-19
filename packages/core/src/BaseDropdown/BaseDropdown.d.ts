import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { PopperProps } from "@material-ui/core/Popper";

export type HvBaseDropdownClassKey =
  | "root"
  | "rootDisabled"
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

export interface HvBaseDropdownProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvBaseDropdownClassKey,
    "placeholder"
  > {
  /**
   * The role of the element that triggers the popup.
   *
   * Defaults to "combobox" if `component` and the default
   * "textbox" header is used, undefined otherwise.
   */
  role?: string;
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
   * If `true` the dropdown width depends size of content if `false` the width depends on the header size.
   * Defaults to `false`.
   */
  variableWidth?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
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
   * Callback called when the dropdown is opened and ready,
   * commonly used to set focus to the content.
   */
  onContainerCreation: (containerRef: React.Ref<HTMLDivElement>) => void;
  /**
   * When expanded dropdown changes position.
   */
  onFlip?: (flipped: boolean) => void;
  /**
   * Attributes applied to the dropdown header element.
   */
  dropdownHeaderProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Pass a ref to the dropdown header element.
   */
  dropdownHeaderRef?: React.Ref<any>;
}

export default function HvBaseDropdown(props: HvBaseDropdownProps): JSX.Element | null;
