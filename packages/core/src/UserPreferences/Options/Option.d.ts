import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "../../Typography";
import { Payload } from "../Actions";

export interface HvOptionProps
  extends StandardProps<HvTypographyProps, HvUserPreferenceActionsClassKey, "onClick"> {
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
  onClick: (event: Event, payload: Payload) => void;
}

export type HvUserPreferenceActionsClassKey = "action" | "noIcon" | "li";

export default function HvUserPreferencesOption(props: HvOptionProps): JSX.Element | null;
