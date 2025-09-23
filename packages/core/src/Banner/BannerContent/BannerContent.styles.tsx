import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvBannerContent", {
  root: {
    minWidth: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },

  full: {
    padding: theme.space.sm,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    "& .HvBannerContent-closeAction": {
      top: theme.space.sm,
      right: theme.space.sm,
      position: "absolute",
    },
    "& .HvBannerContent-messageContainer": {
      textWrap: "unset",
      marginRight: theme.space.lg,
    },
  },
  regular: {
    padding: theme.space.xs,
  },
  micro: {
    padding: 0,
    paddingRight: theme.space.xs,
  },

  success: {},
  warning: {},
  error: {},
  default: {},
  info: {},
  accent: {},
  message: {
    gap: theme.space.xs,
    ...theme.typography.body,
    color: theme.colors.textDark,
  },
  action: {
    flex: "0 0 auto",
    placeSelf: "stretch",
  },
  messageContainer: {
    maxWidth: 700,
  },
  iconContainer: {},
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
