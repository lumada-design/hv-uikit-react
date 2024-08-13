import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { suggestionsClasses } from "../Forms";

export const { staticClasses, useClasses } = createClasses("HvInput", {
  root: { display: "block" },
  labelContainer: { display: "flex", alignItems: "flex-start" },
  label: { paddingBottom: "6px", display: "block" },
  description: {},
  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: "30px",
    justifyContent: "center",
    marginRight: 1,
  },
  icon: { width: "30px", height: "30px" },
  adornmentButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  iconClear: { display: "none" },
  hasSuggestions: {},
  suggestionsContainer: { width: "100%", position: "relative" },
  suggestionList: {
    [`& .${suggestionsClasses.root} .${suggestionsClasses.list} &`]: {
      width: "100%",
    },
  },
  inputExtension: {
    height: theme.space.xs,
    backgroundColor: theme.colors.atmo1,
    boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  input: {
    "&::-ms-clear": {
      display: "none",
    },
  },
  inputRoot: {
    ":hover": {
      "& $iconClear": {
        display: "block",
      },
    },
    ":focus-within $iconClear": {
      display: "block",
    },
  },
  inputRootFocused: {
    "& $iconClear": {
      display: "block",
    },
  },
  inputRootDisabled: {
    cursor: "not-allowed",
  },
  inputRootMultiline: { padding: 0 },
  inputBorderContainer: {
    "$hasSuggestions &": {
      display: "none",
    },
  },
  error: {},
});
