import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropdownList", {
  rootList: {},
  dropdownListContainer: {},
  searchContainer: { marginBottom: theme.space.xs },
  listBorderDown: {},
  listContainer: { padding: theme.space.sm },
  selectAllContainer: {},
  selection: {},
  selectAll: {},
});
