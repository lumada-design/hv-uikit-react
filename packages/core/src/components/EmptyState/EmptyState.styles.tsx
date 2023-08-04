import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvEmptyState", {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: { display: "flex", flexDirection: "row" },
  containerMessageOnly: {
    alignItems: "center",
    "& $textContainer": {
      marginLeft: 0,
    },
  },
  iconContainer: {},
  titleContainer: {
    marginTop: theme.emptyState.titleMarginTop,
    marginBottom: theme.space.sm,
  },
  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    "& a": {
      color: theme.colors.primary,
      textDecoration: "none",
    },
  },
  messageContainer: {},
  actionContainer: { marginTop: theme.space.sm },
});
