import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils";

export const { useClasses, staticClasses } = createClasses("HvTimerPicker", {
  root: {
    position: "relative",
  },

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: 6,
    display: "block",
  },
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
    border: `1px solid ${theme.colors.negative}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative}`,
    },
  },
  dropdownPanel: {
    // TODO: move styles to HvBaseDropdown
    border: `1px solid ${theme.colors.secondary_80}`,
  },

  icon: {},

  timePopperContainer: {
    backgroundColor: theme.colors.atmo1,
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(["xs", 0]),
    userSelect: "none",
    minWidth: "175px",
  },

  error: {},
});
