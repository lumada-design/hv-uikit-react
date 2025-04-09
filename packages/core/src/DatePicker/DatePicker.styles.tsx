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
  labelContainer: {},
  label: {},
  description: {},
  error: {},

  dropdown: {
    display: "block",
  },
  panel: {},

  dropdownHeaderInvalid: {
    "&,:hover": {
      borderColor: theme.form.errorColor,
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
