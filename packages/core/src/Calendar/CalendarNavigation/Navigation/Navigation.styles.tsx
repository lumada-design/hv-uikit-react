import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvNavigation", {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.xs,
  },
  icon: {},
  disabled: {},
  text: {
    minWidth: "unset",
    flex: 1,
    color: theme.colors.secondary,
    fontWeight: theme.typography.body.fontWeight,
    padding: 0,
  },
  textWithoutHover: {
    pointerEvents: "none",
  },
});
