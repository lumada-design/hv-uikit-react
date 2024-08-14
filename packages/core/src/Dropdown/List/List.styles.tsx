import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropdownList", {
  rootList: {},
  dropdownListContainer: {
    overflow: "auto",
    padding: 4,
    margin: -4,
    maxWidth: "var(--maxW)",
    maxHeight: "var(--maxH)",
  },
  virtualized: {
    maxWidth: "inherit",
    maxHeight: "inherit",
    overflow: "inherit",
    padding: 0,
  },
  searchContainer: { marginBottom: theme.space.xs },
  listBorderDown: {},
  listContainer: { padding: theme.space.sm },
  selectAllContainer: {},
  selection: {},
  selectAll: {},
});
