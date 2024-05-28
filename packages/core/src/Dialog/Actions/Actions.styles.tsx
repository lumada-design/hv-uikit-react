import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog-Action", {
  root: {
    margin: "0",
    padding: theme.space.sm,
    borderTop: `3px solid ${theme.colors.dividerDimmed}`,
    height: 65,
    maxHeight: 65,
    flex: 1,
  },
  fullscreen: { position: "fixed", width: "100%", bottom: 0, left: 0 },
  spacing: {
    "& > :not(:first-of-type)": {
      marginLeft: theme.space.xs,
    },
  },
});
