import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvTimePicker", {
  root: {
    position: "relative",
  },

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {},
  description: {},

  placeholder: {
    display: "flex",
    gap: 1,
  },
  placeholderDisabled: {
    color: theme.colors.secondary_60,
  },

  dropdownHeader: {},
  dropdownHeaderOpen: {},
  dropdownHeaderInvalid: {
    border: `1px solid ${theme.colors.negative_120}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative_120}`,
    },
  },
  dropdownPanel: {},

  icon: {},

  timePopperContainer: {
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing("xs", 0),
    userSelect: "none",
    minWidth: "175px",
  },

  error: {},
});
