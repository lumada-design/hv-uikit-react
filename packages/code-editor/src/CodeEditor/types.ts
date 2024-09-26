import { type Monaco } from "@monaco-editor/react";

export type Formatter = (
  content: string,
  editor: any,
  monaco: Monaco,
  options?: any,
) => Promise<string | undefined>;

/**
 * @internal
 * The structure of a Language Plugin.
 */
export interface LanguagePlugin {
  completionProvider?: (monaco: Monaco, schema?: string) => object;
  validator?: (
    content: string,
    editor: any,
    monaco: Monaco,
    schema?: string,
  ) => Promise<object[]>;
  formatter?: Formatter;
  keyDownListener?: (event: any, editor: any, monaco: Monaco) => void;
  editorOptions?: object;
}
