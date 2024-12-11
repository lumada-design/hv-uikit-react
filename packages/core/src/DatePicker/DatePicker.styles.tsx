import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDatePicker", {
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
  label: {},
  description: {},
  error: {},

  dropdown: {
    display: "block",
  },
  panel: {},

  dropdownHeaderInvalid: {
    border: `1px solid ${theme.colors.negative_120}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative_120}`,
    },
  },
  dropdownHeaderOpen: {},
  icon: {},
  action: {
    "&:first-of-type": {
      marginRight: theme.space.xs,
    },
  },
  inputText: {},
  dateText: {
    color: "inherit",
    fontWeight: theme.typography.label.fontWeight,
  },
  container: {},
});
