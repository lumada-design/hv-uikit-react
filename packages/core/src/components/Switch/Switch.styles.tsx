import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSwitch", {
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: { marginBottom: theme.space.xs },
  error: {},
  switchContainer: {
    height: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "1px solid transparent",
  },
  invalidSwitch: {
    paddingBottom: theme.switch.invalidPaddingBottom,
    borderBottom: `1px solid ${theme.colors.negative}`,
  },
});
