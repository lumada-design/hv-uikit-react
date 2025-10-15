import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "../../Button";

export const { staticClasses, useClasses } = createClasses("HvHeaderActions", {
  root: {
    backgroundColor: "transparent",
    display: "flex",
    gap: theme.space.xs,
    alignItems: "center",
    marginLeft: "auto",
    [`& .${buttonClasses?.root}`]: {
      "&:hover": { backgroundColor: theme.colors.bgHover },
    },
  },
});
