import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { suggestionsClasses } from "../FormElement/Suggestions";

export const { staticClasses, useClasses } = createClasses("HvInput", {
  root: { display: "block" },
  labelContainer: { display: "flex", alignItems: "flex-start" },
  label: {},
  description: {},
  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 1,
  },
  icon: { width: "30px", height: "30px" },
  adornmentButton: {
    ":focus-visible,:hover": {
      backgroundColor: "transparent",
    },
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
  input: {},
  inputRoot: {
    ":is(:hover,:focus-within) $iconClear": {
      display: "block",
    },
  },
  inputRootFocused: {
    "& $iconClear": {
      display: "block",
    },
  },
  inputRootDisabled: {},
  inputRootMultiline: { padding: 0 },
  /** @deprecated unused. use `::after` instead */
  inputBorderContainer: {},
  error: {},
});
