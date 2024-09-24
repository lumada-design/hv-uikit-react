import { useRef, useState } from "react";
import { Monaco } from "@monaco-editor/react";
import {
  HvCodeEditor,
  HvCodeEditorProps,
  hvLanguagePlugins,
  hvXmlFormatter,
} from "@hitachivantara/uikit-react-code-editor";

import { Header } from "./utils";

export const CustomPluginStory = () => {
  const [editorValue, setEditorValue] = useState("");

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleMount: HvCodeEditorProps["onMount"] = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleFormat = async () => {
    try {
      const content = editorRef.current.getValue();
      const formattedCode = await hvXmlFormatter(
        content,
        editorRef.current,
        monacoRef.current,
        {
          collapseContent: false,
        },
      );
      if (formattedCode) editorRef.current.setValue(formattedCode);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (import.meta.env.DEV) console.error(error);
    }
  };

  const completionProvider = (monaco: Monaco) => {
    return {
      provideCompletionItems: () => {
        const suggestions = ["Suggestion1", "Suggestion2", "Suggestion3"].map(
          (label) => ({
            label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: label,
            documentation: `Custom suggestion: ${label}`,
            sortText: "1",
          }),
        );
        return {
          suggestions,
        };
      },
    };
  };

  const customPlugin = {
    ...hvLanguagePlugins.xml,
    completionProvider,
  };

  return (
    <div>
      <Header onFormat={handleFormat} />
      <HvCodeEditor
        height={270}
        language="xml"
        value={editorValue}
        onChange={(content) => setEditorValue(content ?? "")}
        onMount={handleMount}
        languagePlugin={customPlugin}
      />
    </div>
  );
};
