import { useCallback, useEffect, useRef, useState } from "react";
import {
  Editor,
  useMonaco,
  type EditorProps,
  type Monaco,
} from "@monaco-editor/react";
import { ExtractNames, useTheme } from "@hitachivantara/uikit-react-shared";

import { staticClasses, useClasses } from "./CodeEditor.styles";
import {
  Elements,
  getXmlCompletionProvider,
  getXmlValidationMarkers,
  getXsdElementsAndAttributes,
  handleXmlKeyDown,
} from "./languages/xml";

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

/** Languages we have custom validations for. */
const languages = { xml: "xml" };
const completionProviders: Record<
  string,
  (monaco: Monaco, elements?: Elements) => object
> = {
  xml: (
    monaco: Monaco,
    elements?: Elements, // needed for XML language
  ) => getXmlCompletionProvider(monaco, elements),
};
const validationMarkers: Record<
  string,
  (
    content: string,
    editor: any,
    monaco: Monaco,
    schema?: string, // needed for XML language
  ) => Promise<object[]>
> = {
  xml: (content: string, editor: any, monaco: Monaco, schema?: string) =>
    getXmlValidationMarkers(content, editor, monaco, schema),
};
const keyDownListeners: Record<
  string,
  (event: any, editor: any, monaco: Monaco) => void
> = {
  xml: (event: any, editor: any, monaco: Monaco) =>
    handleXmlKeyDown(event, editor, monaco),
};

/**
 * A wrapper to the <a href="https://github.com/suren-atoyan/monaco-react" target="_blank"><b>React Monaco editor</b></a> with our styles.
 * Please make sure you follow the instructions (found in the repository) to include the component.
 * Additional information regarding Tab trapping in Monaco, can be found <a href="https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping" target="_blank"><b>here</b></a>.
 */
export const HvCodeEditor = ({
  classes: classesProp,
  options: optionsProp,
  editorProps,
  defaultLanguage,
  language: languageProp,
  xsdSchema,
  onMount: onMountProp,
  beforeMount: beforeMountProp,
  ...others
}: HvCodeEditorProps) => {
  const { classes } = useClasses(classesProp);

  const language = languageProp ?? defaultLanguage;

  const editorRef = useRef(null);

  const initialOpts: EditorProps["options"] = {
    ...defaultCodeEditorOptions,
    ...optionsProp,
  };
  const [options, setOptions] = useState(initialOpts);

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
  }, [selectedTheme, colorModes, handleActiveThemes]);

  const handleMount: EditorProps["onMount"] = (editor, monaco) => {
    editorRef.current = editor;
    onMountProp?.(editor, monaco);

    // Register language
    if (language && !!languages[language as keyof typeof languages])
      monaco.languages.register({ id: language });
    else return; // Don't go further if it's not one of our "special" languages

    // Update options
    if (language === languages.xml)
      setOptions({
        initialOpts,
        autoClosingBrackets: false,
        formatOnType: true,
      });

    // Register completion provider
    if (language && !!completionProviders[language]) {
      const elements =
        xsdSchema && language === languages.xml
          ? getXsdElementsAndAttributes(xsdSchema)
          : undefined;

      monaco.languages.registerCompletionItemProvider(
        language,
        completionProviders[language](monaco, elements),
      );
    }

    // Validate content and get error markers
    if (language && !!validationMarkers[language])
      editor.onDidChangeModelContent(async () => {
        const model = editor.getModel();
        const content = model.getValue();
        const validation = await validationMarkers[language](
          content,
          editor,
          monaco,
          xsdSchema,
        );
        monaco.editor.setModelMarkers(model, language, validation);
      });

    // Listen for key down events
    if (language && !!keyDownListeners[language])
      editor.onKeyDown((event: any) =>
        keyDownListeners[language](event, editor, monaco),
      );
  };

  return (
    <div className={classes.root}>
      <Editor
        options={options}
        theme={`hv-${selectedTheme}-${selectedMode}`}
        language={languageProp}
        defaultLanguage={defaultLanguage}
        beforeMount={(monaco) => {
          beforeMountProp?.(monaco);
          handleActiveThemes();
        }}
        onMount={handleMount}
        {...editorProps}
        {...others}
      />
    </div>
  );
};
