import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

const labelBaseStyle: React.CSSProperties = {
  ...theme.typography.label,
  padding: "0 5px",
  color: theme.colors.atmo1,
  lineHeight: "16px",
};

export const { staticClasses, useClasses } = createClasses("HvBadge", {
  root: { position: "relative", "&>*": { float: "left" } },
  badgeContainer: { width: 0 },
  badgePosition: {},
  badge: {
    borderRadius: theme.space.xs,
    backgroundColor: theme.colors.secondary,
    float: "left",
    minHeight: "8px",
    minWidth: "8px",
  },
  showCount: { ...labelBaseStyle, wordBreak: "keep-all" },
  showLabel: { ...labelBaseStyle, wordBreak: "keep-all" },
  badgeIcon: { position: "relative", top: "1px", left: "-7px" },
  badgeOneDigit: { padding: 0, width: "16px", textAlign: "center" },
});
