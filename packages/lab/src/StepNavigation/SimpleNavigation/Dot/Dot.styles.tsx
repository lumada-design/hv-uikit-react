import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvDot", {
  root: { borderRadius: theme.radii.full, zIndex: 1 },
  active: {},
  ghostDisabled: {},
});
