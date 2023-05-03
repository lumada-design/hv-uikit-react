import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { baseInputClasses, inputClasses } from "../index";
import inlineEditorClasses from "./inlineEditorClasses";

export const styles: {
  root: CSSInterpolation;
  inputBorderContainer: CSSInterpolation;
  input: CSSInterpolation;
  text: CSSInterpolation;
  textEmpty: CSSInterpolation;
  button: CSSInterpolation;
  icon: CSSInterpolation;
  iconVisible: CSSInterpolation;
  largeText: CSSInterpolation;
} = {
  root: {
    [`& .${baseInputClasses.inputRoot}.${inputClasses.inputRoot}`]: {
      height: "100%",
    },
  },
  inputBorderContainer: {
    top: "unset",
    bottom: 0,
  },
  input: {
    padding: theme.spacing([0, "8px"]),
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    alignSelf: "center",
  },
  textEmpty: {
    color: theme.typography.placeholderText.color,
  },
  button: {
    padding: theme.spacing([0, "8px"]),
    boxSizing: "border-box",
    cursor: "text",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "flex-start",

    backgroundColor: "transparent",
    "&:hover, &:focus": {
      outline: `1px solid ${theme.inlineEditor.hoverBorderColor}`,
      backgroundColor: "transparent",
      [`& .${inlineEditorClasses.icon}`]: {
        visibility: "visible",
      },
    },
    "&:active": {
      outline: `1px solid ${theme.inlineEditor.activeBorderColor}`,
      backgroundColor: "transparent",
      [`& .${inlineEditorClasses.icon}`]: {
        visibility: "visible",
      },
    },
    "& > div": {
      width: "100%",
    },
    "& > div > span": {
      width: "100%",
      overflow: "hidden",
    },
  },
  icon: {
    cursor: "pointer",
    visibility: "hidden",
    minWidth: 32,
    alignSelf: "center",
  },
  iconVisible: {
    visibility: "visible",
  },
  largeText: {
    margin: theme.spacing([0, "8px"]),
  },
};
