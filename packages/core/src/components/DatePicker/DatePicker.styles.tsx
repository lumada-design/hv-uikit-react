import { outlineStyles } from "@core/utils";
import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

export const styles: {
  root: CSSInterpolation;
  inputContainer: CSSInterpolation;
  actionContainer: CSSInterpolation;
  leftContainer: CSSInterpolation;
  rightContainer: CSSInterpolation;
  labelContainer: CSSInterpolation;
  label: CSSInterpolation;
  description: CSSInterpolation;
  error: CSSInterpolation;
  dropdown: CSSInterpolation;
  panel: CSSInterpolation;
  dropdownHeaderInvalid: CSSInterpolation;
  dropdownHeaderOpen: CSSInterpolation;
  icon: CSSInterpolation;
  action: CSSInterpolation;
  rangeMainContainer: CSSInterpolation;
  rangeCalendarsContainer: CSSInterpolation;
  rangeCalendarContainer: CSSInterpolation;
} = {
  root: {
    position: "relative",
  },
  inputContainer: {
    position: "relative",
    background: theme.colors.atmo1,
    height: 32,
    paddingLeft: theme.space.xs,
    paddingRight: theme.space.md,
    "&:focus": {
      ...outlineStyles,
    },
  },
  actionContainer: {
    justifyContent: "space-between",
  },
  leftContainer: {},
  rightContainer: {},

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  description: {},
  error: {},

  dropdown: {
    display: "block",
  },
  panel: {
    border: theme.datePicker.panelBorder,
    backgroundColor: theme.datePicker.panelBackgroundColor,
  },

  dropdownHeaderInvalid: {
    border: `1px solid ${theme.colors.negative}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative}`,
    },
  },
  dropdownHeaderOpen: {
    border: theme.datePicker.dropdownHeaderOpenBorder,
    "&:hover": {
      border: theme.datePicker.dropdownHeaderOpenBorder,
    },
  },
  icon: {
    position: "absolute",
    right: -1,
    bottom: -1,
  },
  action: {
    "&:first-of-type": {
      marginRight: theme.space.xs,
    },
  },

  rangeMainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    width: "640px",
  },
  rangeCalendarsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rangeCalendarContainer: {
    width: "50%",
  },
};

// export const StyledButton = styled(HvButton)({
//     "&:first-of-type": {
//         marginRight: theme.space.xs
//       },
// })

// export const StyledTypography = styled(
//     HvTypography,
//     transientOptions,
//     )(({ $dateString } : { $dateString: boolean }) => ({
//         color: theme.colors.secondary_80,
//     ...($dateString && {
//         color: theme.colors.secondary,
//     })
// }))
