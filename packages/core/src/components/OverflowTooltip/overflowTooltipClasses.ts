import { getClasses } from "@core/utils";

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

const overflowTooltipClasses = getClasses<HvOverflowTooltipClasses>(
  classKeys,
  "HvOverflowTooltip"
);

export default overflowTooltipClasses;
