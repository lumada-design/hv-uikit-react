import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropdown", {
  root: {
    width: "100%",
    position: "relative",
    display: "inline-block",
  },
  labelContainer: { display: "flex", alignItems: "flex-start" },
  label: {},
  description: {},
  error: {},
  placeholder: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholderClosed: {
    color: theme.colors.textSubtle,
  },
  selectionDisabled: {
    lineHeight: theme.space.md,
    color: theme.colors.textDisabled,
  },
  dropdown: {
    width: "100%",
    borderRadius: theme.radii.base,

    "& $dropdownHeaderInvalid": {
      border: `1px solid ${theme.colors.negativeDeep}`,
    },
  },
  arrow: {},
  dropdownHeader: {},
  dropdownHeaderInvalid: {},
  dropdownHeaderOpen: {},
  dropdownListContainer: {},
  rootList: {},
  disabled: {
    color: theme.colors.textDisabled,
  },
  readOnly: {
    "& $dropdownHeader": {
      border: `1px solid ${theme.colors.textSubtle}`,
      backgroundColor: theme.colors.bgContainer,
    },
  },
});
