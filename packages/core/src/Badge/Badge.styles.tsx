import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvBadge", {
  root: {
    position: "relative",
    "&>*": { float: "left" },
    ":has($badgeIcon)": {
      width: "fit-content",
      height: "fit-content",
      "&>div:first-child": {
        minWidth: 32,
        minHeight: 32,
        "--icsize": "100%",
      },
    },
  },
  /** class applied to the badge container when it has content */
  badgeContainer: {},
  /** class applied to the badge */
  badgePosition: {
    // TODO: change to relative so that badges don't overflow into the siblings
    position: "absolute",
    left: "100%",
    ...theme.typography.caption2,
    color: theme.colors.textDimmed,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.text,
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
  badgeIcon: { top: "1px", left: "calc(100% - 7px)" },
  badgeOneDigit: { padding: 0, width: "16px" },
});
