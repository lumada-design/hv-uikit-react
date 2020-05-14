import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvUserPreferenceActionsClassKey> {
  /**
   * Visual label.
   */
  label?: string;
  /**
   * Props applied to the generated label.
   */
  labelProps: Object;
}

export type HvUserPreferenceActionsClassKey = "root" | "label";

export default function HvUserPreferencesGroup(props: HvGroupProps): JSX.Element | null;
