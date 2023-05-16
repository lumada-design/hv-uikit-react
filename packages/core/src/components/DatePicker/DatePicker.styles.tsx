import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvDatePickerClasses } from "./datePickerClasses";

export const styles: Partial<
  Record<keyof HvDatePickerClasses, CSSInterpolation>
> = {
  root: {
    position: "relative",
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
};
