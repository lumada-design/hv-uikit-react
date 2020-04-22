import * as React from "react";
import { TooltipProps, StandardProps } from "@material-ui/core";

export interface HvTooltipProps extends StandardProps<TooltipProps, HvTooltipClassKey> {
  /**
   * Values to display in tooltip.
   * @deprecated
   */
  tooltipData?: React.ReactNode;

  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle?: boolean;
}

export type HvTooltipClassKey =
  | "tooltip"
  | "tooltipMulti"
  | "popper"
  | "title"
  | "valuesContainer"
  | "values"
  | "color"
  | "separatorColor"
  | "separator"
  | "valueWrapper";

export default function HvTooltip(props: HvTooltipProps): JSX.Element | null;
