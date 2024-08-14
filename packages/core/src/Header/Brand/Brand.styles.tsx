import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
