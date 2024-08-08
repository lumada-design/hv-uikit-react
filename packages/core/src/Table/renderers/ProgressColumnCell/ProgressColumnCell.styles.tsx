import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvTable-ProgressColumnCell",
  {
    root: { display: "flex", width: "100%" },
    linearProgressContainer: { width: "100%", margin: "auto" },
    linearProgress: {
      height: 8,
    },
    linearProgressRoot: {
      backgroundColor: theme.colors.borderDivider,
    },
    linearProgressColorPrimary: {
      backgroundColor: theme.colors.borderDivider,
    },
    linearProgressBarColorPrimary: {
      backgroundColor: theme.colors.positive,
    },
    linearProgressBarColorSecondary: {
      backgroundColor: theme.colors.text,
    },
  },
);
