import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvLabel", {
  root: { fontWeight: theme.fontWeights.normal, display: "inline-block" },
  labelDisabled: { color: theme.colors.secondary_60 },
  childGutter: { paddingBottom: "6px" },
});
