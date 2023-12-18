import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses("HvBannerContent", {
  root: {
    minWidth: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
    boxShadow: "none",
    borderRadius: theme.radii.none,
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing("xs", 0),
    paddingLeft: theme.space.sm,
  },
  action: {
    padding: theme.spacing("xs"),
    marginRight: 0,
    flex: "0 0 auto",
    placeSelf: "stretch",
  },
  baseVariant: {
    padding: 0,
  },
  success: {
    backgroundColor: theme.colors.positive_20,
  },
  warning: {
    backgroundColor: theme.colors.warning_20,
  },
  error: {
    backgroundColor: theme.colors.negative_20,
  },
  default: {
    backgroundColor: theme.colors.neutral_20,
  },
  outContainer: {
    width: "100%",
    position: "relative",
  },
});
