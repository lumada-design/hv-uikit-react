import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvLink", {
  a: {
    ...theme.typography.label,
    textDecoration: "underline",
    color: theme.colors.primary,

    "&:focus-visible": { ...outlineStyles },
  },
});
