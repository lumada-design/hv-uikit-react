import { type Monaco } from "@monaco-editor/react";

import {
  hvXmlCompletionProvider,
  hvXmlFormatter,
  hvXmlKeyDownListener,
  hvXmlOptions,
  hvXmlValidator,
} from "./languages/xml";

export type Formatter = (
  content: string,
  editor: any,
  monaco: Monaco,
) => Promise<string | undefined>;

export interface LanguagePlugin {
  completionProvider?: (monaco: Monaco) => object;
  validator?: (
    content: string,
    editor: any,
    monaco: Monaco,
  ) => Promise<object[]>;
  formatter?: Formatter;
  keyDownListener?: (event: any, editor: any, monaco: Monaco) => void;
  editorOptions?: object;
}

interface XmlLanguagePlugin
  extends Omit<LanguagePlugin, "completionProvider" | "validator"> {
  completionProvider?: (monaco: Monaco, schema?: string) => object;
  validator?: (
    content: string,
    editor: any,
    monaco: Monaco,
    schema?: string,
  ) => Promise<object[]>;
}

const xmlLanguagePlugin = (): XmlLanguagePlugin => {
  return {
    completionProvider: hvXmlCompletionProvider,
    validator: hvXmlValidator,
    formatter: hvXmlFormatter,
    keyDownListener: hvXmlKeyDownListener,
    editorOptions: hvXmlOptions,
  };
};

export const languagePlugins: Record<
  string,
  LanguagePlugin | XmlLanguagePlugin
> = {
  xml: xmlLanguagePlugin(),
};
