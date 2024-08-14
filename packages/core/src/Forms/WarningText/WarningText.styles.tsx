import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvWarningText", {
  root: { display: "none" },
  defaultIcon: { minWidth: "24px", width: "24px", height: "24px" },
  warningText: {
    color: theme.colors.negative_120,
    paddingRight: theme.space.xs,
  },
  show: { display: "flex" },
  topGutter: { paddingTop: "3px" },
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
