import { getClasses } from "utils";

export type HvOverflowTooltipClasses = {
  root?: string;
  tooltipAnchor?: string;
  tooltipAnchorParagraph?: string;
  tooltipData?: string;
};

const classKeys: string[] = [
  "root",
  "tooltipAnchor",
  "tooltipAnchorParagraph",
  "tooltipData",
];

export const overflowTooltipClasses = getClasses<HvOverflowTooltipClasses>(
  classKeys,
  "HvOverflowTooltip"
);

export * from "./OverflowTooltip";
