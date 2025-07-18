import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvTooltip", {
  root: {},
  tooltip: {
    ...theme.typography.body,
    display: "flex",
    width: "fit-content",
    maxWidth: 532,
    backgroundColor: theme.colors.bgContainer,
    boxShadow: theme.colors.shadow,
    padding: 0,

    "& p": {
      display: "-webkit-box",
      width: "fit-content",
      boxOrient: "vertical",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  popper: {},
});
