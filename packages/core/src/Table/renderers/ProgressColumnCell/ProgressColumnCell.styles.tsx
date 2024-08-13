import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvTable-ProgressColumnCell",
  {
    root: { display: "flex", width: "100%" },
    linearProgressContainer: { width: "100%", margin: "auto" },
    linearProgress: {
      height: 8,
    },
    linearProgressRoot: { backgroundColor: theme.colors.atmo4 },
    linearProgressColorPrimary: {
      backgroundColor: theme.colors.atmo4,
    },
    linearProgressBarColorPrimary: {
      backgroundColor: theme.colors.positive,
    },
    linearProgressBarColorSecondary: {
      backgroundColor: theme.colors.secondary,
    },
  },
);
