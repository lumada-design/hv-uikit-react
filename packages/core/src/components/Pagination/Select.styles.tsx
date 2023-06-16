import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

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
