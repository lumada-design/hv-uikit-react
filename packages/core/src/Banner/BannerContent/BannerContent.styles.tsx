import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvBannerContent", {
  root: {
    minWidth: "100%",
    width: "100%",
    position: "relative",
    gap: theme.space.xs,
    borderRadius: theme.radii.none,
  },
  success: {},
  warning: {},
  error: {},
  default: {},
  message: {
    gap: theme.space.xs,
    padding: theme.spacing("xs", 0),
    paddingLeft: theme.space.sm,
    ...theme.typography.body,
    color: theme.colors.base_dark,
  },
  action: {
    padding: theme.space.xs,
    flex: "0 0 auto",
    placeSelf: "stretch",
  },
  messageContainer: {
    maxWidth: 700,
  },
  iconContainer: {
    marginLeft: theme.spacing(-1),
  },
  messageActions: {
    flex: "0 0 auto",
  },
  actionContainer: {},
  closeAction: {},
  /** @deprecated use ´classes.root` instead */
  baseVariant: {},
  /** @deprecated use `classes.root` instead */
  outContainer: {},
  /** @deprecated use `classes.actionContainer` instead */
  actionsInnerContainer: {},
});
