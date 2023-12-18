import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvOverflowTooltip",
  {
    tooltipData: {},
    tooltipAnchor: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    tooltipAnchorParagraph: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
  }
);
