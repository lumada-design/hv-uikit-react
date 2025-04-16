import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSearchInput", {
  root: { paddingLeft: theme.space.xs },
  input: { marginLeft: 0 },
});
