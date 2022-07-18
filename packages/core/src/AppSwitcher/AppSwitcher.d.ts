import * as React from "react";
import { StandardProps } from "@mui/material";

import { HvAppSwitcherActionApplication } from "./Action";

export type HvAppSwitcherClassKey =
  | "root"
  | "single"
  | "dual"
  | "fluid"
  | "title"
  | "actionsContainer"
  | "footerContainer"
  | "closed"
  | "open"
  | "item"
  | "itemSelected"
  | "itemDisabled"
  | "itemTrigger"
  | "itemIcon"
  | "itemTitle"
  | "itemInfoIcon";

export interface HvAppSwitcherProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvAppSwitcherClassKey> {
  /**
   * Number of columns to render. One, two, or whatever fits the component's width.
   */
  layout?: "single" | "dual" | "fluid";

  /**
   * Title to be displayed on the header of the component.
   */
  title?: string;
  /**
   * The list of applications to be used to render the actions on the component.
   */
  applications: HvAppSwitcherActionApplication[];

  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback?: (
    event: MouseEvent,
    application?: HvAppSwitcherActionApplication
  ) => void;
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback?: (application?: HvAppSwitcherActionApplication) => boolean;

  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header?: string | React.ReactNode;
  /**
   * Element to be added to the footer container.
   */
  footer?: string | React.ReactNode;

  /**
   * Flag stating if the panel is opened or closed.
   */
  isOpen?: boolean;
}

export default function HvAppSwitcher(props: HvAppSwitcherProps): JSX.Element | null;
