import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvCodeEditorClasses {
  root?: string;
}

const classKeys: (keyof HvCodeEditorClasses)[] = ["root"];

const codeEditorClasses = getClasses(classKeys, "HvCodeEditor");

export default codeEditorClasses;
