import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvCharCounter", {
  root: { display: "inline-block", float: "right" },
  counterDisabled: { color: theme.colors.secondary_60 },
  gutter: { paddingLeft: "6px" },
  overloaded: { color: theme.colors.negative },
});
