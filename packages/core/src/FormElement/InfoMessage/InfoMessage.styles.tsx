import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvInfoMessage", {
  root: { color: theme.colors.textSubtle, display: "inline-block" },
  infoDisabled: { color: theme.colors.textDisabled },
  gutter: { padding: theme.spacing(0, 0, "xxs", "xs") },
});
