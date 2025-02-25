import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvTag", {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
    color: theme.colors.textDark,
    backgroundColor: "var(--bgColor)",
    height: 16,
    borderRadius: 0,
    maxWidth: 180,
    whiteSpace: "nowrap",

    ":hover, :focus": {
      backgroundColor: "var(--bgColor)",
    },
  },
  categorical: {
    borderRadius: 8,
    "& $label": {
      color: theme.colors.text,
    },
  },

  disabled: {
    backgroundColor: theme.colors.bgDisabled,
    ":hover, :focus": {
      backgroundColor: theme.colors.bgDisabled,
    },
    "& $label": {
      color: theme.colors.textDisabled,
    },
  },
  label: {
    padding: theme.spacing(0, "xxs"),
    color: "inherit",
  },
  deleteIcon: {
    width: 16,
    height: 16,
    "&:hover": {
      backgroundColor: theme.colors.bgHover,
    },
  },
  selected: {},
  clickable: {
    cursor: "pointer",
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 2,
  },

  /** @deprecated use `root` instead */
  chipRoot: {},
  /** @deprecated unused */
  // TODO: redundant - use deleteIcon. remove in v6
  /** @deprecated */
  button: {},
  /** @deprecated */
  tagButton: {},
  // TODO: redundant - use $clickable or :not($disabled). remove in v6
  /** @deprecated */
  focusVisible: {},
  /** @deprecated */
  disabledDeleteIcon: {},
  /** @deprecated */
  categoricalFocus: {},
  /** @deprecated */
  categoricalDisabled: {},
});
