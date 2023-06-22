import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

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
    marginLeft: "8px",
  },

  radio: {
    height: "16px",

    "&:hover": {
      backgroundColor: theme.colors.neutral_20,
      borderRadius: "100%",
    },
  },

  icon: {
    width: "16px",
    height: "16px",
  },
});
