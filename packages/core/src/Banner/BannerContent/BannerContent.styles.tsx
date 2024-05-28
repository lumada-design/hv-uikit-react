import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
    backgroundColor: theme.colors.successDimmed,
  },
  warning: {
    backgroundColor: theme.colors.warningDimmed,
  },
  error: {
    backgroundColor: theme.colors.errorDimmed,
  },
  default: {
    backgroundColor: theme.colors.neutralDimmed,
  },
  outContainer: {
    width: "100%",
    position: "relative",
  },
});
