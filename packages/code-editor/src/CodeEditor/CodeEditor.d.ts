import { MonacoEditorProps } from "react-monaco-editor";

// eslint-disable-next-line import/no-extraneous-dependencies
import { editor } from "monaco-editor";

export type HvCodeEditorProps = {
  theme: any;
  editorProps: MonacoEditorProps;
  defaultValue?: string;
  onChange?(value: string): void;
  options?: editor.IEditorConstructionOptions;
};

export type HvCodeEditorClassKey = "root" | "headerIncluded";

export default function HvCodeEditor(props: HvCodeEditorProps): JSX.Element | null;
