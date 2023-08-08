import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvWarningText", {
  root: { display: "none" },
  defaultIcon: { minWidth: "32px" },
  warningText: {
    color: theme.colors.negative,
    paddingRight: theme.space.xs,
    "&:first-of-type": {
      paddingLeft: theme.space.xs,
    },
  },
  show: { display: "flex" },
  topGutter: { paddingTop: 6 },
  hideText: {
    // display none or visibility hidden prevents
    // browser to trigger the aria-alert
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    overflow: "hidden",
  },
  topBorder: { borderTop: `solid 1px ${theme.colors.negative}` },
});
