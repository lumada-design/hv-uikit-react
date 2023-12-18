import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "../../Button";
import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvHeader-Actions", {
  root: {
    backgroundColor: "transparent",
    display: "flex",
    gap: theme.space.xs,
    alignItems: "center",
    marginLeft: "auto",
    [`& .${buttonClasses?.root}`]: {
      "&:hover": { backgroundColor: theme.colors.containerBackgroundHover },
    },
  },
});
