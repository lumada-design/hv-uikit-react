import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSection", {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.bgContainer,
    borderRadius: theme.radii.round,
    border: `1px solid ${theme.colors.border}`,
  },
  hidden: { height: 0, display: "none" },
  header: {
    display: "flex",
    alignItems: "center",
    borderColor: "inherit",
    position: "relative",
    minHeight: theme.sizes.sm,
    padding: theme.space.sm,
  },
  content: {
    padding: theme.space.sm,
    borderRadius: "inherit",
    borderColor: "inherit",
  },
  hasHeader: {
    paddingTop: 0,
  },
  /** @deprecated use `hasHeader` instead */
  spaceTop: {},
  actions: {
    display: "flex",
    gap: theme.space.xs,
    marginLeft: "auto",
  },
  raisedHeader: {
    "& $header": {
      zIndex: 1,
      borderBottomWidth: 1,
      boxShadow: theme.colors.shadow,
    },
    "& $content": {
      paddingTop: theme.space.sm,
    },
  },
});
