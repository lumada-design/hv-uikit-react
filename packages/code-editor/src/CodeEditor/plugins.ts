import { type Monaco } from "@monaco-editor/react";

import {
  getXmlCompletionProvider,
  getXmlValidationMarkers,
  handleXmlKeyDown,
  xmlOptions,
} from "./languages/xml";

type CompletionProvider = (
  monaco: Monaco,
  schema?: string, // needed for XML language
) => object;
type ValidationMarker = (
  content: string,
  editor: any,
  monaco: Monaco,
  schema?: string, // needed for XML language
) => Promise<object[]>;
type KeyDownListener = (event: any, editor: any, monaco: Monaco) => void;

interface LanguagePlugin {
  completionProvider?: CompletionProvider;
  validationMarker?: ValidationMarker;
  keyDownListener?: KeyDownListener;
  editorOptions?: object;
}

const xmlLanguagePlugin = (): LanguagePlugin => {
  return {
    completionProvider: getXmlCompletionProvider,
    validationMarker: getXmlValidationMarkers,
    keyDownListener: handleXmlKeyDown,
    editorOptions: xmlOptions,
  };
};

export const languagePlugins: Record<string, LanguagePlugin> = {
  xml: xmlLanguagePlugin(),
};
