import { getClasses } from "@core/utils";
import { CSSInterpolation } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

export const styles = {
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
} satisfies Record<string, CSSInterpolation>;

export const staticClasses = getClasses(
  Object.keys(styles) as Array<keyof typeof styles>,
  "HvTimePicker"
);
