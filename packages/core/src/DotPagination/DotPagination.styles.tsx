import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvDotPagination", {
  root: {
    display: "flex",
    justifyContent: "center",
  },

  horizontal: {
    width: "auto",
  },

  radioRoot: {},

  radio: {
    height: 16,
    width: 16,
    minWidth: 16,
    color: "inherit",

    "&:hover": {
      backgroundColor: theme.colors.neutral_20,
      borderRadius: "100%",
    },
  },

  icon: {
    minWidth: 0,
    width: 16,
    height: 16,
    color: "inherit",
    "&& svg": {
      color: "inherit",
      border: "none",
      width: "unset",
      height: "unset",
    },
  },
});
