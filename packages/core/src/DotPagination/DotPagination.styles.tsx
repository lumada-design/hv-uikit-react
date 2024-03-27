import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { useClasses, staticClasses } = createClasses("HvDotPagination", {
  root: {
    display: "flex",
    justifyContent: "center",
  },

  horizontal: {
    marginLeft: 0,
    width: "auto",
  },

  radioRoot: {
    marginLeft: theme.space.xs,
  },

  radio: {
    height: 16,
    width: 16,
    minWidth: 16,

    "&:hover": {
      backgroundColor: theme.colors.neutral_20,
      borderRadius: "100%",
    },
  },

  icon: {
    minWidth: 0,
    width: 16,
    height: 16,
    "&& svg": {
      border: "none",
      width: "unset",
      height: "unset",
    },
  },
});
