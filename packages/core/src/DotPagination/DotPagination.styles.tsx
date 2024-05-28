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
      backgroundColor: theme.colors.neutralDimmed,
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
