import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvOverflowTooltip",
  {
    tooltipData: {},
    tooltipAnchor: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      width: "fit-content",
    },
    tooltipAnchorParagraph: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
  },
);
