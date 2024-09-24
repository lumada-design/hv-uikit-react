import { type Monaco } from "@monaco-editor/react";

import {
  hvSqlCompletionProvider,
  hvSqlFormatter,
  hvSqlOptions,
  hvSqlValidator,
} from "./languages/sql";
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
  options?: any,
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
  schema?: string;
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

interface SqlLanguagePlugin extends Omit<LanguagePlugin, "completionProvider"> {
  completionProvider?: (monaco: Monaco, schema?: string) => object;
  formatter?: Formatter;
}

const xmlLanguagePlugin: XmlLanguagePlugin = {
  completionProvider: hvXmlCompletionProvider,
  validator: hvXmlValidator,
  formatter: hvXmlFormatter,
  keyDownListener: hvXmlKeyDownListener,
  editorOptions: hvXmlOptions,
};

const sqlLanguagePlugin: SqlLanguagePlugin = {
  completionProvider: hvSqlCompletionProvider,
  validator: hvSqlValidator,
  formatter: hvSqlFormatter,
  editorOptions: hvSqlOptions,
};

export const hvLanguagePlugins: Record<
  string,
  LanguagePlugin | XmlLanguagePlugin | SqlLanguagePlugin
> = {
  xml: xmlLanguagePlugin,
  sql: sqlLanguagePlugin,
};
