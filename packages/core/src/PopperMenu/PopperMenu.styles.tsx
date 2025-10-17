import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvPopperMenu", {
  root: {},
  popper: {
    width: 240,
    backgroundColor: theme.colors.bgContainer,
    border: `1px solid ${theme.colors.borderSubtle}`,
    borderRadius: theme.radii.large,
    padding: theme.spacing("sm", "sm"),
  },
  checkBoxGroup: {
    width: "100%",
  },
  checkBoxLabel: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  search: {
    paddingLeft: 0,
  },
  bulkActions: {
    border: "none",
    padding: theme.spacing("xs", 0),
    backgroundColor: "transparent",
  },
  listItem: {
    "&:not(:last-child)": {
      marginBottom: 0,
    },
  },
  empty: {
    padding: theme.space.xs,
  },
  actions: {
    borderTop: "none",
    justifyContent: "space-evenly",
    padding: 0,
    paddingTop: theme.space.sm,
  },
});
