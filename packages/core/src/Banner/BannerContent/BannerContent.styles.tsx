import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

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
    backgroundColor: theme.colors.positiveSubtle,
  },
  warning: {
    backgroundColor: theme.colors.warningSubtle,
  },
  error: {
    backgroundColor: theme.colors.errorSubtle,
  },
  default: {
    backgroundColor: theme.colors.neutralSubtle,
  },
  outContainer: {
    width: "100%",
    position: "relative",
  },
});
