import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvInfoMessage", {
  root: {
    color: theme.colors.textSubtle,
    display: "inline-block",
  },
  infoDisabled: {
    color: theme.colors.textDisabled,
  },
  gutter: {
    padding: `0 0 6px ${theme.space.xs}`,
  },
});
