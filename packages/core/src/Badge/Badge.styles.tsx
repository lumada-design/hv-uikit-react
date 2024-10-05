import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvBadge", {
  root: { position: "relative", "&>*": { float: "left" } },
  /** class applied to the badge container when it has content */
  badgeContainer: { width: 0 },
  /** class applied to the badge */
  badgePosition: {
    ...theme.typography.caption2,
    color: theme.colors.atmo1,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.secondary,
    lineHeight: "16px",
    minWidth: 8,
    padding: "0 5px",
    float: "left",
    wordBreak: "keep-all",
    textAlign: "center",

    ":empty": {
      height: 8,
      width: 8,
      padding: 0,
    },
  },
  /** applied to the badge when it's visible */
  badge: {},
  /** applied to the badge when it's hidden */
  badgeHidden: {
    display: "none",
  },
  showCount: {},
  showLabel: {},
  badgeIcon: { position: "relative", top: "1px", left: "-7px" },
  badgeOneDigit: { padding: 0, width: "16px" },
});
