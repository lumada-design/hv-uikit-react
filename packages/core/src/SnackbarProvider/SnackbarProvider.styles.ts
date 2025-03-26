import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses(
  "HvSnackbarProvider",
  {
    snackItemRoot: {
      backgroundColor: "transparent !important",
      boxShadow: "none !important",
      "&&": {
        color: "inherit",
        padding: "0",
        fontSize: "inherit",
        boxShadow: "none",
        alignItems: "center",
        fontFamily: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        borderRadius: theme.radii.none,
        letterSpacing: "inherit",
        backgroundColor: "inherit",
      },
    },
  },
);
