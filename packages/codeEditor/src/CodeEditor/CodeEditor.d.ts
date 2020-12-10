/* eslint-disable import/no-extraneous-dependencies */
import { MonacoEditorProps } from "react-monaco-editor";
import { editor } from "monaco-editor";

export type HvCodeEditorProps = {
  editorProps: MonacoEditorProps;
  defaultValue?: string;
  onChange?(value: string): void;
  options?: editor.IEditorConstructionOptions;
};

export type HvCodeEditorClassKey = "root";

export default function HvCodeEditor(props: HvCodeEditorProps): JSX.Element | null;
