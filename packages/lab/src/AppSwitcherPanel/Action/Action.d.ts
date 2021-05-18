import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvAppSwitcherPanelActionApplication {
  /**
   * Id of the application.
   */
  id?: string;
  /**
   * Name of the application, this is the value that will be displayed on the component.
   */
  name: string;
  /**
   * The color to be applied to the item's border and to the default icon.
   * You can use either an HEX or color name from the palette.
   */
  color?: string;
  /**
   * URL with the icon location to be used to represent the application.
   * iconUrl will only be used if no iconElement is provided.
   */
  iconUrl?: string;
  /**
   * Element to be added as the icon representing the application.
   * The iconElement will be the primary option to be displayed.
   */
  iconElement?: React.ReactNode;
  /**
   * Small description of the application.
   */
  description?: string;
  /**
   *  URL where the application is accesible.
   */
  url?: string;
  /**
   * Defines if the application should be opened in the same tab or in a new one.
   */
  target?: "_top" | "_blank";
  /**
   * If true, the item will be disabled.
   */
  disabled?: boolean;
  /**
   * True when the application is selected, false otherwise.
   */
  isSelected?: boolean;
}

export type HvAppSwitcherPanelActionClassKey =
  | "root"
  | "typography"
  | "selected"
  | "icon"
  | "iconUrl"
  | "title"
  | "iconInfo";

export interface HvAppSwitcherPanelActionProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvAppSwitcherPanelActionClassKey> {
  /**
   * The application data to be used to render the Action object.
   */
  application: HvAppSwitcherPanelActionApplication;
  /**
   * Callback triggered when the action is clicked.
   */
  onClickCallback?: (event: MouseEvent, application?: HvAppSwitcherPanelActionApplication) => void;
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isSelectedCallback?: (application?: HvAppSwitcherPanelActionApplication) => boolean;
}

export default function HvAppSwitcherPanelAction(
  props: HvAppSwitcherPanelActionProps
): JSX.Element | null;
