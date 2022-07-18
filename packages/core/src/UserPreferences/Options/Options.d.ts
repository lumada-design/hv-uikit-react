import { StandardProps } from "@mui/material";
import * as React from "react";
import { Payload } from "../Action";

export type HvOptionsClassKey = "root";

export interface HvOptionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvOptionsClassKey, "onClick"> {
  /**
   * Callback called when clicked.
   */
  onClick: (event: Event, payload: Payload) => void;
}

export default function HvUserPreferencesOptions(props: HvOptionsProps): JSX.Element | null;
