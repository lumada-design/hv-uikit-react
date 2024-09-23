import { useCallback, useEffect, useRef } from "react";
import { Editor, useMonaco, type EditorProps } from "@monaco-editor/react";
import { useTheme, type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { staticClasses, useClasses } from "./CodeEditor.styles";
import { Formatter, LanguagePlugin, languagePlugins } from "./plugins";

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
  /** XSD schema used to validate the code editor content when the language is set to `xml`. */
  xsdSchema?: string;
  /**
   * Whether to disable code auto format or not. Code format happens on mount, on blur, and on paste.
   * Supported languages: `XML`.
   * Defaults to `false`.
   */
  disableAutoFormat?: boolean;
  /** Language plugin. This will override the default language plugin used internally. */
  languagePlugin?: LanguagePlugin;
}

const defaultCodeEditorOptions: EditorProps["options"] = {
  automaticLayout: true,
  overviewRulerLanes: 0,
  minimap: {
    enabled: true,
  },
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
 * A wrapper to the [**React Monaco editor**](https://github.com/suren-atoyan/monaco-react) with our styles.
 * Please make sure you follow the instructions (found in the repository) to include the component.
 * Additional information regarding Tab trapping in Monaco, can be found [**here**](https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping).
 */
export const HvCodeEditor = ({
  classes: classesProp,
  options,
  editorProps,
  defaultLanguage,
  language: languageProp,
  xsdSchema,
  disableAutoFormat = false,
  onMount: onMountProp,
  beforeMount: beforeMountProp,
  languagePlugin: languagePluginProp,
  ...others
}: HvCodeEditorProps) => {
  const { classes } = useClasses(classesProp);

  const language = languageProp ?? defaultLanguage;

  const editorRef = useRef<any>(null);

  // Merges the 2 objects together, overriding defaults with passed in options
  const mergedOptions: EditorProps["options"] = {
    ...defaultCodeEditorOptions,
    ...options,
  };

  const { colors, selectedMode, selectedTheme, colorModes } = useTheme();
  const monacoInstance = useMonaco();

  const handleActiveThemes = useCallback(() => {
    if (!monacoInstance) return;

    colorModes.forEach((mode) => {
      monacoInstance?.editor.defineTheme(`hv-${selectedTheme}-${mode}`, {
        base: colors?.type === "light" ? "vs" : "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": colors?.atmo1 || "",
          "editorLineNumber.foreground": colors?.secondary_60 || "",
        },
      });
    });
  }, [
    monacoInstance,
    colorModes,
    selectedTheme,
    colors?.type,
    colors?.atmo1,
    colors?.secondary_60,
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
      // eslint-disable-next-line no-console
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

    // Get language plugin
    const languagePlugin =
      languagePluginProp ?? (language ? languagePlugins[language] : undefined);

    if (!languagePlugin) return;

    // Register language
    monaco.languages.register({ id: language });

    const {
      completionProvider,
      editorOptions,
      keyDownListener,
      validator,
      formatter,
    } = languagePlugin;

    // Update options
    if (editorOptions)
      editor.updateOptions({
        ...options,
        ...editorOptions,
      });

    // Register completion provider
    if (completionProvider)
      monaco.languages.registerCompletionItemProvider(
        language,
        completionProvider(monaco, xsdSchema),
      );

    // Validate content and get error markers
    if (validator)
      editor.onDidChangeModelContent(async () => {
        const model = editor.getModel();
        const content = model.getValue();
        const validate = await validator(content, editor, monaco, xsdSchema);
        monaco.editor.setModelMarkers(model, language, validate);
      });

    // Listen for key down events
    if (keyDownListener)
      editor.onKeyDown((event: any) => keyDownListener(event, editor, monaco));

    // Listen for events to auto format code
    if (formatter && !disableAutoFormat) {
      // On mount
      handleFormatCode(editor, monaco, formatter);

      // On blur
      editor.onDidBlurEditorText(() =>
        handleFormatCode(editor, monaco, formatter),
      );

      // On paste
      editor.onDidPaste(() => handleFormatCode(editor, monaco, formatter));
    }
  };

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
