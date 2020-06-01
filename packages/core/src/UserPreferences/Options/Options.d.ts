import {StandardProps} from "@material-ui/core";
import * as React from "react";
import {Payload} from "../Actions";

export interface HvOptionsProps
    extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvOptionsClassKey, "onClick"> {
  /**
   * Callback called when clicked.
   */
  onClick: (event: Event, payload: Payload) => void;
}

export type HvOptionsClassKey = "optionsRoot";

export default function HvUserPreferencesOptions(props: HvOptionsProps): JSX.Element | null;
