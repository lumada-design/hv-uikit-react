import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

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
  inputText: {
    color: theme.colors.secondary_80,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dateText: {
    color: theme.colors.secondary,
  },
});
