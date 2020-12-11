import * as React from "react";
import { MonacoEditorProps } from "react-monaco-editor";
import { editor } from "monaco-editor";

export type HvLabCodeEditorProps = {
  editorProps: MonacoEditorProps;
  defaultValue?: string;
  onChange?(value: string): void;
  options?: editor.IEditorConstructionOptions;
};

export type HvLabCodeEditorClassKey = "root";

export default function HvLabCodeEditor(props: HvLabCodeEditorProps): JSX.Element | null;
