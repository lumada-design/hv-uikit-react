import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses } = createClasses("HvPaginationSelect", {
  root: {},
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
