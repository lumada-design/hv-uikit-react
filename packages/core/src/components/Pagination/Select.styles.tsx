import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses } = createClasses("HvPaginationSelect", {
  header: {
    backgroundColor: "transparent",
    borderColor: theme.pagination.pageSizeBorderColor,
    "&:hover": {
      borderColor: theme.pagination.pageSizeHoverBorderColor,
    },
  },
  selection: {
    padding: theme.spacing([0, "md", 0, "xs"]),
  },
  headerOpen: {
    backgroundColor: theme.colors.atmo1,
  },
});
