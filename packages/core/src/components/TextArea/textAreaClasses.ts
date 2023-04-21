import { getClasses } from "@core/utils";

export interface HvTextAreaClasses {
  root?: string;
  disabled?: string;
  resizable?: string;
  invalid?: string;
  baseInput?: string;
  input?: string;
  inputResizable?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  characterCounter?: string;
  error?: string;
}

const classKeys: string[] = [
  "root",
  "disabled",
  "resizable",
  "invalid",
  "baseInput",
  "input",
  "inputResizable",
  "labelContainer",
  "label",
  "description",
  "characterCounter",
  "error",
];

const textAreaClasses = getClasses<HvTextAreaClasses>(classKeys, "HvTextArea");

export default textAreaClasses;
