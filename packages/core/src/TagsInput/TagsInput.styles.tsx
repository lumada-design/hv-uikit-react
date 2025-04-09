import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTagsInput", {
  /** @deprecated unused */
  listItemGutters: {},
  /** @deprecated use `chipRoot` */
  listItemRoot: {},
  root: { display: "inline-block", width: "100%" },
  // TODO: consider renaming this
  chipRoot: {
    maxWidth: "none",
  },
  disabled: {
    "& $tagsList": {
      backgroundColor: theme.colors.bgPage,
      "&,:hover": {
        borderColor: theme.colors.border,
      },
    },
  },
  readOnly: {
    "& $tagsList": {
      backgroundColor: theme.colors.bgPage,
      "&,:hover": {
        borderColor: theme.colors.textDisabled,
      },
    },
  },
  resizable: { width: "auto", resize: "both", clear: "both", overflow: "auto" },
  invalid: {},
  labelContainer: {},
  label: {},
  description: {},
  characterCounter: {
    display: "block",
    float: "right",
    textAlign: "right",
    marginBottom: "6px",
  },
  tagsList: {
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
    gap: theme.spacing("xxs", "xs"),
    cursor: "text",
    width: "100%",
    minHeight: 32,
    padding: theme.spacing("xxs", "xs"),
    overflow: "auto",
    position: "relative",

    flexDirection: "row",
    flexWrap: "wrap",

    backgroundColor: theme.colors.bgContainer,
    borderWidth: 1,
    borderColor: theme.colors.textSubtle,
    borderRadius: theme.radii.base,

    "&:hover": {
      borderColor: theme.colors.primary,
    },

    "&:focus-within, &:focus-visible": {
      ...outlineStyles,
    },

    "&$singleLine": {
      flexWrap: "nowrap",
    },

    "&$error, $invalid": {
      borderColor: theme.form.errorColor,
    },
  },
  /** @deprecated use `classes.input` instead */
  tagInputContainerRoot: {},
  /** @deprecated use `classes.input` instead */
  tagInputRoot: {},
  input: {
    display: "flex",
    flex: "1 0 auto",
    height: "auto",
    width: 0,
    minWidth: 60,
    border: "none",
    margin: 0,
    padding: 0,
    ...theme.typography.caption1,
    backgroundColor: "transparent",
    outline: "none",
    boxShadow: "none",
  },
  /** @deprecated unused.  use `:focus` or `:focus-visible` instead */
  tagSelected: {},
  /** @deprecated unused. use `::after` instead */
  tagInputBorderContainer: {},
  /** @deprecated unused. use `:focus` or `:focus-visible` instead */
  tagInputRootFocused: {},
  /** @deprecated unused */
  tagInputRootEmpty: {},
  singleLine: {},
  error: { float: "left" },
  inputExtension: {},
  suggestionsContainer: {},
  suggestionList: {},
});
