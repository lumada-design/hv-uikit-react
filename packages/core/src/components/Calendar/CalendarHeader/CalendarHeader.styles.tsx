import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCalendarHeader", {
  root: {
    marginTop: theme.spacing("xs"),
    backgroundColor: theme.colors.atmo1,
    borderBottom: theme.calendar.headerInputBorderBottom,
    borderTop: theme.calendar.headerInputBorderTop,
    borderLeft: theme.calendar.headerInputBorderLeft,
    borderRight: theme.calendar.headerInputBorderRight,
    borderRadius: theme.calendar.borderRadius,
    "&:hover, &:focus": {
      borderBottom: `1px solid ${theme.colors.secondary}`,
    },
  },
  invalid: {},
  headerDayOfWeek: {
    color: theme.calendar.headerInputFontColor,
    paddingLeft: theme.spacing("xs"),
  },
  headerDate: {},
  input: {
    border: "none",
    backgroundColor: "transparent",
    padding: `5px ${theme.spacing("xs")}`,
    fontFamily: theme.fontFamily.body,

    color: theme.calendar.headerInputFontColor,
    fontSize: theme.calendar.headerInputFontSize,
    letterSpacing: theme.calendar.headerInputFontLetterSpacing,
    lineHeight: theme.calendar.headerInputFontLineHeight,
    fontWeight: theme.calendar.headerInputFontWeight,
    width: "100%",
    "&::placeholder": {
      color: theme.colors.secondary_60,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  inputBorderContainer: {
    backgroundColor: theme.colors.negative,
    height: 1,
    marginTop: -1,
  },
  invalidMessageStyling: {
    display: "flex",
    alignItems: "center",
    color: theme.colors.negative,
  },
});
