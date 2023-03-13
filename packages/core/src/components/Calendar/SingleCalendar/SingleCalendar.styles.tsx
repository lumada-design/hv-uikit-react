import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import singleCalendarClasses from "./singleCalendarClasses";

export const StyledCalendarContainer = styled("div")({
  backgroundColor: theme.colors.atmo1,
  width: "320px",
  minHeight: "440px",
  position: "relative",
});

export const StyledCalendarWrapper = styled("div")({
  overflow: "hidden",
  backgroundColor: theme.colors.atmo1,
  padding: theme.spacing("sm"),
});

export const StyledCalendarGrid = styled("div")({
  display: "flex",
  flexFlow: "wrap",
  width: "280px",
  [`& .${singleCalendarClasses.cellsInRange}`]: {
    backgroundColor: theme.colors.atmo3,
    [`& .${singleCalendarClasses.startBookend}`]: {
      borderLeft: `1px solid ${theme.colors.acce1}`,
      backgroundColor: theme.colors.atmo3,
      "&:hover": {
        borderRight: `1px solid ${theme.colors.acce1}`,
      },
    },
  },

  [`&:hover .${singleCalendarClasses.cellsInRange}`]: {
    backgroundColor: theme.colors.atmo3,
    [`& .${singleCalendarClasses.startBookend}`]: {
      borderLeft: `1px solid ${theme.colors.acce1}`,
      borderRight: "inherit",
    },
  },

  [`& .${singleCalendarClasses.cellsInRange}:hover`]: {
    backgroundColor: theme.colors.atmo3,
    [`& .${singleCalendarClasses.calendarDate}`]: {
      borderRight: `1px solid ${theme.colors.acce1}`,
    },
  },

  [`& .${singleCalendarClasses.cellsInRange}:hover ~ .${singleCalendarClasses.cellsInRange}`]:
    {
      backgroundColor: theme.colors.atmo1, // controls the right side of the hovered range
    },
  [`& .${singleCalendarClasses.cellsOutsideRange}:hover ~ .${singleCalendarClasses.cellsInRange}`]:
    {
      backgroundColor: theme.colors.atmo1, // control the right side when hovering outside of the range
    },
});
