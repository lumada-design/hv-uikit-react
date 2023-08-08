import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvInfoMessage", {
  root: { color: theme.forms.infoMessage.textColor, display: "inline-block" },
  infoDisabled: { color: theme.colors.secondary_60 },
  gutter: { padding: `0 0 6px ${theme.space.xs}` },
});
