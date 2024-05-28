import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../../utils/focusUtils";

const hover = {
  backgroundColor: theme.colors.bgActive,
  cursor: "pointer",
};

export const { staticClasses, useClasses } = createClasses("HvMonthSelector", {
  calendarMonthlyGrid: {
    marginTop: "50px",
    marginLeft: "-16px",
    display: "flex",
    zIndex: "10",
    padding: "0 20px",
    position: "absolute",
    flexFlow: "wrap",
    alignContent: "center",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.bgSurface,
  },
  rangeModeWidth: {},
  normalWidth: {},
  focusSelection: {
    "&:hover": {
      ...hover,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...hover,
      ...outlineStyles,
    },
  },
  calendarMonthlyCell: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    width: "92px",
    "&:hover": {
      ...hover,
    },
  },
  calendarMonthlyCellSelected: {
    backgroundColor: theme.colors.bgActive,
    color: theme.colors.text,
    "&:hover": {
      backgroundColor: theme.colors.bgActive,
      color: theme.colors.text,
    },
  },
});
