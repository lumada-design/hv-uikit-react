import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../utils/classes";
import { outlineStyles } from "../../../utils/focusUtils";

const name = "HvVerticalScrollListItem";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    padding: "0",
    height: "32px",
    width: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "1em",
    height: "1em",
    borderRadius: "50%",
    fontSize: 6,
    color: theme.colors.secondary,
    display: "inline-block",
    backgroundColor: "currentcolor",
  },
  notSelected: {
    fontSize: 4,
    color: theme.colors.secondary_60,
  },
  // TODO: remove in v6 (use classes.button)
  text: {},
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "16px",
    width: "16px",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,

      "& $notSelected": {
        fontSize: 6,
        color: theme.colors.secondary,
      },
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
});
