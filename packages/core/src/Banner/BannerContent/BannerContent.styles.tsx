import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvBannerContent", {
  root: {
    minWidth: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
    boxShadow: "none",
    borderRadius: theme.radii.none,
    gap: theme.space.xs,
    padding: 0,
  },
  message: {
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
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
  /** @deprecated use ´classes.root` instead */
  baseVariant: {},
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
  /** @deprecated use `classes.root` instead */
  outContainer: {},
  messageContainer: {
    wordBreak: "break-word",
    maxWidth: 700,
    textWrap: "balance",
    overflow: "hidden",
  },
  iconContainer: {
    marginLeft: theme.spacing(-1),
  },
  messageActions: {
    flex: "0 0 auto",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    gap: theme.space.xs,
  },
  /** @deprecated use `classes.actionContainer` instead */
  actionsInnerContainer: {},
  closeAction: {
    alignSelf: "flex-end",
  },
});
