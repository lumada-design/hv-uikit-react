import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropdown", {
  root: {
    width: "100%",
    position: "relative",
    display: "inline-block",
  },
  labelContainer: { display: "flex", alignItems: "flex-start" },
  label: { paddingBottom: "6px", display: "block" },
  description: {},
  error: {},
  placeholder: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  selectionDisabled: {
    lineHeight: theme.space.md,
    color: theme.dropdown.disabledColor,
  },
  dropdown: {
    width: "100%",
    borderRadius: theme.radii.base,

    "& $dropdownHeaderInvalid": {
      border: theme.dropdown.dropdownHeaderInvalidBorder,
      "&:hover": {
        border: theme.dropdown.dropdownHeaderInvalidBorder,
      },
    },
  },
  arrow: {},
  dropdownHeader: {},
  dropdownHeaderInvalid: {},
  dropdownHeaderOpen: {},
  dropdownListContainer: {},
  rootList: {},
});
