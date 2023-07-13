import { getClasses } from "@core/utils/classes";

export interface HvOverflowTooltipClasses {
  root?: string;
  tooltipAnchor?: string;
  tooltipAnchorParagraph?: string;
  tooltipData?: string;
}

const classKeys: (keyof HvOverflowTooltipClasses)[] = [
  "root",
  "tooltipAnchor",
  "tooltipAnchorParagraph",
  "tooltipData",
];

const overflowTooltipClasses = getClasses(classKeys, "HvOverflowTooltip");

export default overflowTooltipClasses;
