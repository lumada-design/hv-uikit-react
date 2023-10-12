import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses } = createClasses("HvPaginationSelect", {
  header: {
    backgroundColor: "transparent",
    borderColor: theme.colors.secondary_80,
    "&:hover": {
      borderColor: theme.colors.secondary_80,
    },
  },
  selection: {
    padding: theme.spacing(0, "md", 0, "xs"),
  },
  headerOpen: {
    backgroundColor: theme.colors.atmo1,
  },
});
