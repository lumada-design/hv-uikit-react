import { chipClasses } from "@mui/material";

import { theme } from "@hitachivantara/uikit-styles";

import { suggestionsClasses } from "@core/components/Forms";
import { baseInputClasses } from "@core/components/BaseInput";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTagsInput", {
  input: {
    width: "100%",
    ...theme.typography.caption1,
  },
  listItemGutters: { padding: "0 5px" },
  listItemRoot: {
    marginBottom: 2,
    height: 24,
    lineHeight: "24px",

    "&:not(:last-child)": {
      marginBottom: 2,
    },

    "&$singleLine": {
      display: "table-cell",
      paddingTop: "2px",
    },
  },
  root: { display: "inline-block", width: "100%" },
  chipRoot: {
    [`&.${chipClasses.root}`]: {
      maxWidth: "none",
    },
  },
  disabled: {
    "& $tagsList": {
      backgroundColor: theme.tagsInput.disabledBackgroundColor,
      border: `1px solid ${theme.colors.atmo4}`,

      "&:focus-within, &:hover": {
        border: `1px solid ${theme.colors.atmo4}`,
      },
    },
  },
  readOnly: {
    "& $tagsList": {
      backgroundColor: theme.tagsInput.readOnlyBackgroundColor,
      border: `1px solid ${theme.tagsInput.readOnlyBorderColor}`,

      "&:hover": {
        border: `1px solid ${theme.tagsInput.readOnlyBorderColor}`,
      },
    },
  },
  resizable: { width: "auto", resize: "both", overflow: "auto" },
  invalid: {},
  labelContainer: { float: "left", display: "flex", alignItems: "flex-start" },
  label: { display: "block", float: "left", paddingBottom: "6px" },
  description: { display: "block", float: "left" },
  characterCounter: {
    display: "block",
    float: "right",
    textAlign: "right",
    marginBottom: "6px",
  },
  tagsList: {
    display: "flex",
    alignContent: "flex-start",
    float: "left",
    clear: "both",
    width: "100%",
    maxWidth: "100%",
    height: "32px",
    padding: 5,
    overflow: "auto",
    position: "relative",

    flexDirection: "row",
    flexWrap: "wrap",

    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.tagsInput.borderColor}`,
    borderRadius: theme.radii.base,

    "&:hover": {
      cursor: "text",
      border: `1px solid ${theme.tagsInput.hoverColor}`,
    },

    [`& .${baseInputClasses.inputRoot}`]: {
      border: "none",
    },

    "&:focus, &:focus-within, &:focus-visible": {
      outlineColor: "#52A8EC",
      outlineStyle: "solid",
      outlineWidth: "0px",
      outlineOffset: "-1px",
      boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
    },

    "&$singleLine": {
      overflowX: "hidden",
      overflowY: "hidden",
      height: 32,
      display: "table-row",
      paddingTop: 0,
    },

    "&$error": {
      border: `1px solid ${theme.colors.negative}`,
    },

    "&$invalid": {
      border: `1px solid ${theme.colors.negative}`,
    },
  },
  tagInputContainerRoot: {
    display: "flex",
    flexGrow: 1,
    height: 24,
    lineHeight: "24px",

    "&$singleLine": {
      display: "table-cell",
      minWidth: 60,
      width: "100%",
      paddingTop: "3px",
      verticalAlign: "middle",
    },
  },
  tagInputRoot: {
    [`& .${baseInputClasses.root}`]: {
      width: "100%",
      border: "none",
      "&:hover $tagInputBorderContainer": {
        background: "none",
      },
    },
    [`&& .${baseInputClasses.inputRoot}`]: {
      marginLeft: 0,
      marginRight: 0,
      flex: "1 1 auto",
      height: 24,
      lineHeight: "24px",
      padding: 0,
      border: "none",
    },
    [`& .${baseInputClasses.inputBorderContainer}`]: {
      border: "none",
      background: "none",
    },
    [`& .${baseInputClasses.inputRootFocused}`]: {
      outline: "none",
      boxShadow: "none",
    },
    [`& .${baseInputClasses.root} .${baseInputClasses.inputRootReadOnly}`]: {
      backgroundColor: "transparent",
      border: "none",
      "&:hover": {
        border: "none",
      },
    },
    [`&& .${baseInputClasses.input}`]: {
      marginLeft: 0,
    },
  },
  tagSelected: {
    outlineColor: "#52A8EC",
    outlineStyle: "solid",
    outlineWidth: "0px",
    outlineOffset: "-1px",
    boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
  },
  tagInputBorderContainer: {},
  tagInputRootFocused: {},
  tagInputRootEmpty: {},
  singleLine: {},
  error: { float: "left" },
  inputExtension: {},
  suggestionsContainer: {
    width: "100%",
    position: "relative",
    top: 59,
    [`& .${suggestionsClasses.root} .${suggestionsClasses.list} &`]: {
      width: "100%",
    },
  },
  suggestionList: {},
});
