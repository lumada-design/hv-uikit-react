import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvLink", {
  a: {
    ...theme.typography.label,
    textDecoration: "underline",
    color: theme.colors.primary,

    "&:focus-visible": { ...outlineStyles },
  },
});
