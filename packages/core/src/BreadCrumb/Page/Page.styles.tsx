import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvBreadCrumbPage", {
  link: {
    padding: `8px ${theme.space.xs}`,
    borderRadius: theme.radii.base,
    maxWidth: 170 + 16,
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:focus": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  label: {},
  a: {},
});
