import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import { createClasses } from "@core/utils/classes";

const hover = {
  backgroundColor: theme.colors.atmo3,
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
    backgroundColor: theme.colors.atmo1,
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
    backgroundColor: theme.colors.atmo3,
    color: theme.colors.secondary,
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
      color: theme.colors.secondary,
    },
  },
});
