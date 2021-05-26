import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "../..";

export type HvUserPreferenceActionClassKey = "root";

export interface Payload {
  /**
   * the id to be applied to the root element.
   */
  id: string;
  /**
   * the label to be rendered on the menu item.
   */
  label: string;
}

export interface HvUserPreferenceActionProps
  extends StandardProps<HvTypographyProps, HvUserPreferenceActionClassKey, "onClick"> {
  /**
   * Visual label.
   */
  label?: string;

  /**
   * Icon.
   */
  icon?: React.ReactNode;

  /**
   * Callback called when clicked.
   */
  onClick?: (event: Event, payload: Payload) => void;
}

export default function HvUserPreferencesAction(
  props: HvUserPreferenceActionProps
): JSX.Element | null;
