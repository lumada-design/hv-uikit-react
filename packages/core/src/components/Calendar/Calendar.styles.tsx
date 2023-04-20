import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import calendarClasses from "./calendarClasses";
import { HvSingleCalendar, HvSingleCalendarProps } from "./SingleCalendar";

export const StyledRoot = styled("div")({
  display: "flex",
  justifyContent: "center",
});

export const StyledRangeCalendarContainer = styled("div")({
  display: "flex",
});

export const StyledSingleCalendar = styled((props: HvSingleCalendarProps) => (
  <HvSingleCalendar {...props} />
))({
  "&:hover": {
    [`& ~ .${calendarClasses.singleCalendar}`]: {
      // target the next calendar when the former is hovered
      "& > div": {
        "& > div:nth-child(3)": {
          "& > div": {
            "& > div[data-calendar-cell='calendarCell']": {
              backgroundColor: theme.colors.atmo1,
            },
          },
        },
      },
    },
  },
});
