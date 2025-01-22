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
    ...theme.typography.body,
    color: theme.colors.base_dark,
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
  messageContainer: {
    wordBreak: "break-word",
    maxWidth: 700,
    overflow: "hidden",
    marginRight: 10,
  },
  iconContainer: {
    marginRight: theme.space.xs,
    marginLeft: -theme.space.xs,
  },
  messageActions: {
    flex: "0 0 auto",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  actionsInnerContainer: {
    flexDirection: "row",
    marginTop: "8px", // avoid overlap with close button outline focus ring
  },
  closeAction: {
    alignSelf: "flex-end",
  },
});
