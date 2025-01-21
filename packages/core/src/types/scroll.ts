export type HvScrollToTooltipPositions = "left" | "right" | "top" | "bottom";

export interface HvScrollToOption {
  key?: React.Key;
  label: string;
  value: string;
  offset?: number;
}

/** @deprecated use `HvScrollToOption` */
export type HvScrollToVerticalOption = HvScrollToOption;

/** @deprecated use `HvScrollToOption` */
export type HvScrollToHorizontalOption = HvScrollToOption;

export type HvScrollToVerticalPositions = "absolute" | "fixed" | "relative";
