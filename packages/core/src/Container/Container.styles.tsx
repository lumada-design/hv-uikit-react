import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvContainer", {
  root: {
    ":not($disableGutters)": {
      paddingLeft: theme.space.sm,
      paddingRight: theme.space.sm,
      [theme.bp.up("md")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
  },
  disableGutters: {},
  fixed: {},
  maxWidthXs: {},
  maxWidthSm: {},
  maxWidthMd: {},
  maxWidthLg: {},
  maxWidthXl: {},
});
