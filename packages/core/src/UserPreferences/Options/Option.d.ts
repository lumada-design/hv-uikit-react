import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvTypographyProps } from "../../Typography";
import { Payload } from "../Action";

export type HvUserPreferencesOptionClassKey = "action" | "noIcon" | "li";

export interface HvOptionProps
  extends StandardProps<HvTypographyProps, HvUserPreferencesOptionClassKey, "onClick"> {
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

export default function HvUserPreferencesOption(props: HvOptionProps): JSX.Element | null;
