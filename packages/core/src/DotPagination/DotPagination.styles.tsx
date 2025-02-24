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

    "&:hover": {
      backgroundColor: theme.colors.neutral_20,
      borderRadius: "100%",
    },
  },

  icon: {
    minWidth: 0,
    width: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 16,
    "&& svg": {
      border: "none",
      width: "unset",
      height: "unset",
    },
    "& > div": {
      color: theme.colors.secondary,
      backgroundColor: "currentcolor",
      width: "1em",
      height: "1em",
      borderRadius: "50%",
    },
  },
});
