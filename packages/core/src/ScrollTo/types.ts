export type HvScrollToTooltipPositions = "left" | "right" | "top" | "bottom";

export interface HvScrollToOption {
  key?: string;
  label: string;
  value: string;
  offset?: number;
}

export type HvScrollToVerticalOption = HvScrollToOption;

export type HvScrollToVerticalPositions = "absolute" | "fixed" | "relative";
