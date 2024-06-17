import { useCallback, useEffect } from "react";
import { Editor, EditorProps, useMonaco } from "@monaco-editor/react";
import { ExtractNames, useTheme } from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./CodeEditor.styles";

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
 * A wrapper to the React Monaco editor (https://github.com/suren-atoyan/monaco-react) with our styles.
 * Please make sure you follow the instructions (found in the repository) to include the component.
 * Additional information regarding Tab trapping in Monaco, can be found here: https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping.
 */
export const HvCodeEditor = ({
  classes: classesProp,
  defaultValue,
  options,
  editorProps,
  ...others
}: HvCodeEditorProps) => {
  const { classes } = useClasses(classesProp);

  const { colors, selectedMode, selectedTheme, colorModes } = useTheme();

  const monaco = useMonaco();

  // Merges the 2 objects together, overriding defaults with passed in options
  const mergedOptions = {
    ...defaultCodeEditorOptions,
    ...options,
  };

  const defineActiveThemes = useCallback(() => {
    if (!monaco) return;

    colorModes.forEach((mode) => {
      monaco?.editor.defineTheme(`hv-${selectedTheme}-${mode}`, {
        base: colors?.type === "light" ? "vs" : "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": colors?.atmo1 || "",
          "editorLineNumber.foreground": colors?.secondary_60 || "",
        },
      });
    });
  }, [monaco, colorModes, selectedTheme, colors]);

  useEffect(() => {
    defineActiveThemes();
  }, [selectedTheme, colorModes, defineActiveThemes]);

  return (
    <div className={classes.root}>
      <Editor
        options={mergedOptions}
        beforeMount={defineActiveThemes}
        theme={`hv-${selectedTheme}-${selectedMode}`}
        {...editorProps}
        {...others}
      />
    </div>
  );
};
