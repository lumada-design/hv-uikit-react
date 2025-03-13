import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvEmptyState", {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.bp.only("xs")]: {
      alignItems: "center",
      textAlign: "center",
      ":not($containerMessageOnly)": {
        flexDirection: "column",
      },
    },
  },
  /** @deprecated use `classes.root` instead */
  container: {},
  containerMessageOnly: {
    alignItems: "center",
    "& $textContainer": {
      marginLeft: 0,
    },
  },
  iconContainer: {},
  titleContainer: {
    marginTop: theme.space.xxs,
    marginBottom: theme.space.sm,
  },
  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    [theme.bp.up("sm")]: {
      marginLeft: theme.space.xs,
    },
  },
  messageContainer: {},
  actionContainer: { marginTop: theme.space.sm },
});
