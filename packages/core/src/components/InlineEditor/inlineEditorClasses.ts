import { getClasses } from "@core/utils";

export interface HvInlineEditorClasses {
  root?: string;
  button?: string;
  largeText?: string;
  text?: string;
  textEmpty?: string;
  icon?: string;
  iconVisible?: string;
  inputRoot?: string;
  input?: string;
  inputBorderContainer?: string;
}

const classKeys: string[] = [
  "root",
  "button",
  "largeText",
  "text",
  "textEmpty",
  "icon",
  "iconVisible",
  "inputRoot",
  "input",
  "inputBorderContainer",
];

const inlineEditorClasses = getClasses<HvInlineEditorClasses>(
  classKeys,
  "HvInlineEditor"
);

export default inlineEditorClasses;
