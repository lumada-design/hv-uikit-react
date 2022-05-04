import * as React from "react";
import { StandardProps } from "@mui/material";
import { NavigationData } from "../Navigation";
import { HvTypographyProps } from "../../Typography";

export type HvActionClassKey = "action" | "noIcon";

export interface HvActionProps
  extends StandardProps<HvTypographyProps, HvActionClassKey, "onClick"> {
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
  onClick: (event: Event, selectedItem: NavigationData) => void;
}

export default function HvVerticalNavigationAction(props: HvActionProps): JSX.Element | null;
