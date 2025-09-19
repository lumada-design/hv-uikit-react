import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvBannerContent", {
  root: {
    minWidth: "100%",
    width: "100%",
    position: "relative",
    gap: theme.space.xs,
    overflow: "hidden",
  },

  full: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    "& .HvBannerContent-closeAction": {
      position: "absolute",
      top: 16,
    },
    "& .HvBannerContent-messageContainer": {
      textWrap: "unset",
      marginRight: 48,
    },
  },
  regular: {
    padding: 8,
  },
  micro: {
    padding: 0,
    paddingRight: 8,
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
