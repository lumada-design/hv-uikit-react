import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvPage", {
  link: {
    padding: `8px ${theme.space.xs}`,
    borderRadius: theme.radii.base,
    maxWidth: 170 + 16,
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus": {
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  label: {},
  a: {},
});
