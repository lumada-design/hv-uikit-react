import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropdownList", {
  rootList: {},
  dropdownListContainer: {},
  searchContainer: { marginBottom: theme.dropdown.searchContainerMargin },
  listBorderDown: {},
  listContainer: { padding: theme.dropdown.listContainerPadding },
  selectAllContainer: {},
  selection: {},
  selectAll: {},
});
