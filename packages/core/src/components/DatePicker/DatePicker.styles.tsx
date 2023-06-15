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
  panel: {},

  dropdownHeaderInvalid: {
    border: `1px solid ${theme.colors.negative}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative}`,
    },
  },
  dropdownHeaderOpen: {},
  icon: {},
  action: {
    "&:first-of-type": {
      marginRight: theme.space.xs,
    },
  },
};
