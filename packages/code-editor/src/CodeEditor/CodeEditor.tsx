import { useCallback, useEffect, useRef } from "react";
import { Editor, useMonaco, type EditorProps } from "@monaco-editor/react";
import { useTheme, type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { staticClasses, useClasses } from "./CodeEditor.styles";
import { hvLanguagePlugins } from "./plugins";
import { Formatter, LanguagePlugin } from "./types";

export { staticClasses as codeEditorClasses };

export type HvCodeEditorClasses = ExtractNames<typeof useClasses>;

export interface HvCodeEditorProps extends EditorProps {
  /** The properties of the Monaco editor. */
  editorProps?: EditorProps;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCodeEditorClasses;
  /** The initial value of the code editor */
  defaultValue?: string;
  /** The properties of the editor object in Monaco. */
  options?: EditorProps["options"];
  /** Schema used to validate the code editor content. */
  schema?: string;
  /**
   * Whether to disable code auto format or not. Code format happens on mount, on blur, and on paste.
   * Supported languages: `XML`.
   * Defaults to `false`.
   */
  disableAutoFormat?: boolean;
  /** Language plugin. This will override the default language plugin used internally. */
  languagePlugin?: LanguagePlugin;
  /** Enable offline mode for Monaco Editor. Use local resources instead of CDN. */
  offline?: boolean;
}

const defaultCodeEditorOptions: EditorProps["options"] = {
  automaticLayout: true,
  overviewRulerLanes: 0,
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  scrollbar: {
    horizontal: "visible",
    vertical: "visible",
    verticalScrollbarSize: 20,
    horizontalScrollbarSize: 20,
    verticalSliderSize: 5,
    horizontalSliderSize: 5,
  },
};

/**
 * A wrapper to the [React Monaco editor](https://github.com/suren-atoyan/monaco-react) with our styles.
 * Please make sure you follow the instructions (found in the repository) to include the component.
 * Additional information regarding Tab trapping in Monaco, can be found [here](https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping).
 */
export const HvCodeEditor = ({
  classes: classesProp,
  options,
  schema,
  editorProps,
  defaultLanguage,
  language: languageProp,
  disableAutoFormat = false,
  onMount: onMountProp,
  beforeMount: beforeMountProp,
  languagePlugin: languagePluginProp,
  offline = false,
  ...others
}: HvCodeEditorProps) => {
  const { classes } = useClasses(classesProp);
  const language = languageProp ?? editorProps?.language ?? defaultLanguage;
  const editorRef = useRef<any>(null);
  const completionProviderRef = useRef<any>(null);

  const mergedOptions: EditorProps["options"] = {
    ...defaultCodeEditorOptions,
    ...options,
  };

  const { colors, selectedMode, selectedTheme, colorModes } = useTheme();
  const monacoInstance = useMonaco();

  // Configure Monaco for offline use
  useEffect(() => {
    if (!offline) return;

    import("../monaco-config")
      .then(({ configureMonacoOffline }) => configureMonacoOffline())
      .catch(() => {
        // Silently fall back to CDN
      });
  }, [offline]);

  const handleActiveThemes = useCallback(() => {
    if (!monacoInstance) return;

    colorModes.forEach((mode) => {
      monacoInstance.editor.defineTheme(`hv-${selectedTheme}-${mode}`, {
        base: colors?.type === "light" ? "vs" : "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": colors?.bgContainer || "",
          "editorLineNumber.foreground": colors?.textDisabled || "",
        },
      });
    });
  }, [
    monacoInstance,
    colorModes,
    selectedTheme,
    colors?.type,
    colors?.bgContainer,
    colors?.textDisabled,
  ]);

  useEffect(() => {
    handleActiveThemes();
  }, [handleActiveThemes]);

  const handleFormatCode = async (
    editor: any,
    monaco: any,
    formatter: Formatter,
  ) => {
    try {
      const model = editor.getModel();
      const content = model.getValue();
      const formattedCode = await formatter(content, editor, monaco);
      if (formattedCode) editorRef.current.setValue(formattedCode);
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
    }
  };

  const handleBeforeMount: EditorProps["beforeMount"] = (monaco) => {
    beforeMountProp?.(monaco);
    handleActiveThemes();
  };

  const handleMount: EditorProps["onMount"] = (editor, monaco) => {
    editorRef.current = editor;
    onMountProp?.(editor, monaco);

    const languagePlugin =
      languagePluginProp ??
      (language ? hvLanguagePlugins[language] : undefined);

    if (!language || !languagePlugin) return;

    monaco.languages.register({ id: language });

    const {
      completionProvider,
      editorOptions,
      keyDownListener,
      validator,
      formatter,
    } = languagePlugin;

    if (editorOptions) {
      editor.updateOptions({ ...options, ...editorOptions });
    }

    // Clean up previous completion provider
    completionProviderRef.current?.dispose();

    if (completionProvider) {
      completionProviderRef.current =
        monaco.languages.registerCompletionItemProvider(
          language,
          completionProvider(monaco, schema),
        );
    }

    if (validator) {
      editor.onDidChangeModelContent(async () => {
        const model = editor.getModel();
        if (!model) return;
        const content = model.getValue();
        const validate = await validator(content, editor, monaco, schema);
        monaco.editor.setModelMarkers(model, language, validate);
      });
    }

    if (keyDownListener) {
      editor.onKeyDown((event: any) => keyDownListener(event, editor, monaco));
    }

    if (formatter && !disableAutoFormat) {
      handleFormatCode(editor, monaco, formatter);
      editor.onDidBlurEditorText(() =>
        handleFormatCode(editor, monaco, formatter),
      );
      editor.onDidPaste(() => handleFormatCode(editor, monaco, formatter));
    }
  };

  useEffect(() => {
    return () => completionProviderRef.current?.dispose();
  }, []);

  return (
    <div className={classes.root}>
      <Editor
        options={mergedOptions}
        theme={`hv-${selectedTheme}-${selectedMode}`}
        language={languageProp}
        defaultLanguage={defaultLanguage}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        {...editorProps}
        {...others}
      />
    </div>
  );
};
