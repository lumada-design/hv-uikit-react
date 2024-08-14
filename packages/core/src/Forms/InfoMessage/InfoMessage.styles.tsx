import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvInfoMessage", {
  root: { color: theme.colors.secondary_80, display: "inline-block" },
  infoDisabled: { color: theme.colors.secondary_60 },
  gutter: { padding: `0 0 6px ${theme.space.xs}` },
});
