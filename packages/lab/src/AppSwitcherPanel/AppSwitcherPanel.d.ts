import * as React from "react";
import { StandardProps } from "@material-ui/core";

import { HvAppSwitcherPanelActionApplication } from "./Action";

export type HvAppSwitcherPanelClassKey =
  | "root"
  | "open"
  | "headerContainer"
  | "titleContainer"
  | "title"
  | "actionsContainer"
  | "footerContainer";

export interface HvAppSwitcherPanelProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvAppSwitcherPanelClassKey> {
  /**
   * Flag stating if the panel is opened or closed.
   */
  isOpen?: boolean;
  /**
   * Title to be displayed on the header of the component.
   */
  title?: string;
  /**
   * The list of applications to be used to render the actions on the component.
   */
  applications: HvAppSwitcherPanelActionApplication[];
  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header?: React.ReactNode;
  /**
   * Element to be added to the footer container.
   */
  footer?: React.ReactNode;
  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback?: (
    event: MouseEvent,
    application?: HvAppSwitcherPanelActionApplication
  ) => void;
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback?: (application?: HvAppSwitcherPanelActionApplication) => boolean;
}

export default function HvAppSwitcherPanel(props: HvAppSwitcherPanelProps): JSX.Element | null;
