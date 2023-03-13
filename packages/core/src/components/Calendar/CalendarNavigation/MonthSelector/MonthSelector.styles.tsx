import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";
import monthSelectorClasses from "./monthSelectorClasses";

const hover = {
  backgroundColor: theme.colors.atmo3,
  cursor: "pointer",
};

export const StyledFocusSelection = styled("div")({
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
});

export const StyledCalendarMonthlyGrid = styled("div")({
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
});

export const StyledCalendarMonthlyCell = styled(HvTypography)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  height: "40px",
  width: "92px",
  "&:hover": {
    ...hover,
  },
  [`&.${monthSelectorClasses.calendarMonthlyCellSelected}`]: {
    backgroundColor: theme.colors.atmo3,
    color: theme.colors.acce1,
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
      color: theme.colors.acce1,
    },
  },
});
