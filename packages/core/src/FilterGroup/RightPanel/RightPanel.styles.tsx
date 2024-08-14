import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvFilterGroupRightPanel";

export const { staticClasses, useClasses } = createClasses(name, {
  search: {
    marginBottom: theme.spacing("xs"),
  },
  list: {
    height: "calc(100% - 70px)",
    overflowY: "auto",
  },
  selectAllContainer: {
    // Prevent the focus ring to be hidden by sibling hover background
    "&": {
      position: "relative",
      zIndex: 0,
    },
    "&:focus-within": {
      zIndex: 1,
    },
  },
  selectAll: {
    width: "100%",
  },
});
