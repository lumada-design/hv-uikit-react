import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

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
