import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvLabel", {
  root: { fontWeight: theme.fontWeights.normal, display: "inline-block" },
  labelDisabled: { color: theme.colors.secondary_60 },
  childGutter: { paddingBottom: 4 },
});