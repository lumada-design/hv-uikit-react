import { TooltipProps, StandardProps } from "@material-ui/core";

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

export interface HvTooltipProps extends StandardProps<TooltipProps, HvTooltipClassKey> {
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle?: boolean;
}

export default function HvTooltip(props: HvTooltipProps): JSX.Element | null;
