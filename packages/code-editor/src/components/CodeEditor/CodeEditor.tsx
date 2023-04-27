import { HvTheme, useTheme } from "@hitachivantara/uikit-react-core";
import MonacoEditor, { MonacoEditorProps, monaco } from "react-monaco-editor";
import { StyledContainer } from "./CodeEditor.styles";
import codeEditorClasses, { HvCodeEditorClasses } from "./codeEditorClasses";
import { clsx } from "clsx";
import { useEffect } from "react";

export interface HvCodeEditorProps extends MonacoEditorProps {
  /** The properties of the Monaco editor. */
  editorProps?: MonacoEditorProps;
  /* A Jss Object used to override or extend the styles applied. */
  classes?: HvCodeEditorClasses;
  /** The initial value of the code editor */
  defaultValue?: string;
  /**  The function called when the written code changes */
  onChange?: (value: string) => void;
  /** The properties of the editor object in Monaco. */
  options?: MonacoEditorProps["options"];
}

const defaultCodeEditorOptions: MonacoEditorProps["options"] = {
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
 * A wrapper to the React Monaco editor (https://github.com/react-monaco-editor/react-monaco-editor) with our styles.
 * Please make sure you follow the instructions (found in the repository) to include the component.
 * Webpack configurations, and MonacoWebpackPlugin, are required to see the editor syntax highlight.
 * Additional information regarding Tab trapping in Monaco, can be found here: https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping.
 */
export const HvCodeEditor = ({
  classes,
  defaultValue,
  options,
  editorProps,
  ...others
}: HvCodeEditorProps) => {
  const { activeTheme, selectedMode, selectedTheme, colorModes } = useTheme();

  // Merges the 2 objects together, overriding defaults with passed in options
  const mergedOptions = {
    ...defaultCodeEditorOptions,
    ...options,
  };

  const defineActiveThemes = (
    themeName: string,
    modes: string[],
    theme?: HvTheme
  ) => {
    modes.forEach((mode) => {
      monaco.editor.defineTheme(`hv-${themeName}-${mode}`, {
        base: theme?.colors.modes[mode].type === "light" ? "vs" : "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": theme?.colors.modes[mode].atmo1 || "",
          "editorLineNumber.foreground":
            theme?.colors.modes[mode].secondary_60 || "",
        },
      });
    });
  };

  useEffect(() => {
    defineActiveThemes(selectedTheme, colorModes, activeTheme);
  }, [selectedTheme]);

  return (
    <StyledContainer className={clsx(classes?.root, codeEditorClasses.root)}>
      <MonacoEditor
        defaultValue={defaultValue}
        options={mergedOptions}
        editorWillMount={() =>
          defineActiveThemes(selectedTheme, colorModes, activeTheme)
        }
        theme={`hv-${selectedTheme}-${selectedMode}`}
        {...editorProps}
        {...others}
      />
    </StyledContainer>
  );
};
