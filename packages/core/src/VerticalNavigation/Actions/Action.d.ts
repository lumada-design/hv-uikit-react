import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { NavigationData } from "../../VerticalNavigation/Navigation";
import { HvTypographyProps } from "../../Typography";

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

export type HvActionClassKey = "action" | "noIcon";

export default function HvVerticalNavigationAction(props: HvActionProps): JSX.Element | null;
