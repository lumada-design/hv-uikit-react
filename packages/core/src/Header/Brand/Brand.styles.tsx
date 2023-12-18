import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvHeader-Brand", {
  root: { display: "flex", alignItems: "center" },
  separator: {
    width: 1,
    height: theme.space.sm,
    margin: theme.space.xs,
    backgroundColor: theme.colors.secondary,
  },
  brandName: {},
});
