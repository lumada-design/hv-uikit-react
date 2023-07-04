/** Tooltip type */
export const tooltipType = ["single", "multiple"] as const;
export type HvChartTooltipType = (typeof tooltipType)[number];

export interface HvChartTooltipParams {
  title?: string | number;
  series?: {
    name?: string;
    value?: string | number;
    color?: string;
  }[];
}

export interface HvChartTooltip {
  /** Whether to show the tooltip or not. Defaults to `true`. */
  show?: boolean;
  /** Tooltip type: single line or multiple lines modes. The single line mode should only be used when there's one series. Defaults to `multiple`. */
  type?: HvChartTooltipType;
  /** Formatter for the value in the tooltip. */
  valueFormatter?: (value?: string | number) => string;
  /** Formatter for the title in the tooltip. */
  titleFormatter?: (value?: string | number) => string;
  /** Custom tooltip. */
  component?:
    | string
    | ((params?: HvChartTooltipParams) => string | HTMLElement | HTMLElement[]);
}
