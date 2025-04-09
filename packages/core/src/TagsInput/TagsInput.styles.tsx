import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
  disabled: {},
  readOnly: {},
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

    flexDirection: "row",
    flexWrap: "wrap",

    borderColor: theme.colors.textSubtle,

    "&$singleLine": {
      flexWrap: "nowrap",
      overflow: "auto hidden",
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
