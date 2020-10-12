import { outlineStyles } from "../Focus/styles";

const icon = {
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "30px",
  height: "30px",
};

const styles = (theme) => ({
  root: {
    position: "relative",
    background: theme.palette.atmo1,
    height: "32px",
    paddingLeft: theme.hvSpacing("xs"),
    paddingRight: theme.hvSpacing("md"),
    fontFamily: theme.hv.typography.fontFamily,
    "&:focus": {
      ...outlineStyles,
    },
  },
  inputCalendarClosed: {
    border: `1px solid ${theme.palette.atmo6}`,
    "&:hover": {
      cursor: "pointer",
      border: `1px solid ${theme.palette.acce1}`,
    },
  },
  inputCalendarOpen: {
    boxShadow: theme.hv.shadows[1],
    border: `1px solid ${theme.palette.atmo1}`,
  },
  noBorderTop: {
    borderTop: "none",
  },
  noBorderBottom: {
    borderBottom: "none",
  },
  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "transparent",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.placeholderText,
    },
  },
  icon: {
    ...icon,
    cursor: "pointer",
    "&:focus": {
      ...outlineStyles,
    },
  },
  iconClear: {
    ...icon,
    cursor: "pointer",
  },
  datePickerContainer: {
    position: "relative",
    width: "320px",
  },
  label: {
    marginBottom: theme.hvSpacing("xs"),
    display: "block",
  },
  calendarContainer: {
    backgroundColor: theme.palette.atmo1,
    width: "320px",
  },
  singleCalendarFooter: {
    padding: theme.hvSpacing("sm"),
    textAlign: "right",
    borderTop: `3px solid ${theme.palette.atmo2}`,
  },
  rangeMainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.atmo1,
    width: "640px",
  },
  rangeCalendarsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rangeLeftCalendarContainer: {
    width: "50%",
  },
  rangeRightCalendarContainer: {
    width: "50%",
  },
  rangeCalendarsFooter: {
    display: "flex",
    flexDirection: "row",
    borderTop: `3px solid ${theme.palette.atmo2}`,
  },
  rangeFooterLeft: {
    width: "50%",
  },
  rangeFooterRight: {
    width: "50%",
    textAlign: "right",
    padding: theme.hvSpacing("sm"),
  },
  actionsContainer: {
    textAlign: "right",
  },
  borderTopNone: {
    borderTop: "none",
  },
  borderBottomNone: {
    borderBottom: "none",
  },
  borderTopDisplay: {
    borderTop: `1px solid ${theme.palette.acce1}`,
  },
  borderBottomDisplay: {
    borderBottom: `1px solid ${theme.palette.acce1}`,
  },
  popperRoot: {
    display: "block",
  },
  listBorderDown: {
    height: "10px",
    width: "320px",
    background: theme.palette.atmo1,
  },
  listBorderUp: {
    height: "10px",
    boxShadow: " 0px -5px 5px -4px rgba(65,65,65,.12)",
    width: "320px",
    background: theme.palette.atmo1,
  },
  calendarOpenDown: {
    background: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
  },
  calendarOpenUp: {
    background: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
  },
});

export default styles;
