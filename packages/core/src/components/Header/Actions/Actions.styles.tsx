import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "@core/components/Button";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvHeader-Actions", {
  root: {
    backgroundColor: "transparent",
    display: "flex",
    gap: theme.space.xs,
    alignItems: "center",
    marginLeft: "auto",
    [`& .${buttonClasses?.root}`]: {
      "&:hover": { backgroundColor: theme.header.hoverColor },
    },
  },
});
