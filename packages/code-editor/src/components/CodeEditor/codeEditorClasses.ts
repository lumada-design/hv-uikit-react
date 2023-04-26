import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvCodeEditorClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const codeEditorClasses = getClasses<HvCodeEditorClasses>(
  classKeys,
  "HvCodeEditor"
);

export default codeEditorClasses;
