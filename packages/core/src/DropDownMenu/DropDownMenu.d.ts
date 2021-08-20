import * as React from "react";
import { IconButtonProps, StandardProps } from "@material-ui/core";
import { ListValueProp } from "../List";

export type HvDropDownMenuClassKey =
  | "root"
  | "container"
  | "baseContainer"
  | "icon"
  | "iconSelected"
  | "menuList";

export interface HvDropDownMenuProps
  extends StandardProps<IconButtonProps, HvDropDownMenuClassKey, "onClick"> {
  /**
   * Icon.
   */
  icon?: React.ReactNode;
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - searchValue: Text used when filtering the list. Used when label is a node.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - icon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: ListValueProp[];
  /**
   * Placement of the dropdown.
   */
  placement?: "left" | "right";
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Function executed on toggle of the dropdown. Should receive the open status.
   */
  onToggle?: (event: React.SyntheticEvent, open: boolean) => void;
  /**
   * @deprecated This prop should not be used. Use onToggle instead.
   */
  onToggleOpen?: (open: boolean) => void;
  /**
   * Function executed in each onClick. Should received the clicked element.
   */
  onClick?: (event: MouseEvent, item: ListValueProp) => void;
  /**
   * Keep the Dropdown Menu opened after clicking one option
   */
  keepOpened?: boolean;
  /**
   * Defines if the component is disabled.
   */
  disabled?: boolean;
  /**
   * If true it should be displayed open.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
}

export default function HvDropDownMenu(props: HvDropDownMenuProps): JSX.Element | null;
