import { HvTheme, useTheme } from "@hitachivantara/uikit-react-core";
import { Editor, EditorProps, useMonaco } from "@monaco-editor/react";
import { clsx } from "clsx";
import { useCallback, useEffect } from "react";
import { StyledContainer } from "./CodeEditor.styles";
import codeEditorClasses, { HvCodeEditorClasses } from "./codeEditorClasses";

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
  classes,
  defaultValue,
  options,
  editorProps,
  ...others
}: HvCodeEditorProps) => {
  const { activeTheme, selectedMode, selectedTheme, colorModes } = useTheme();
  const monaco = useMonaco();

  // Merges the 2 objects together, overriding defaults with passed in options
  const mergedOptions = {
    ...defaultCodeEditorOptions,
    ...options,
  };

  const defineActiveThemes = useCallback(
    (themeName: string, modes: string[], theme?: HvTheme) => {
      if (monaco) {
        modes.forEach((mode) => {
          monaco?.editor.defineTheme(`hv-${themeName}-${mode}`, {
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
      }
    },
    [monaco]
  );

  useEffect(() => {
    defineActiveThemes(selectedTheme, colorModes, activeTheme);
  }, [selectedTheme, colorModes, activeTheme, defineActiveThemes]);

  return (
    <StyledContainer className={clsx(classes?.root, codeEditorClasses.root)}>
      <Editor
        options={mergedOptions}
        beforeMount={() =>
          defineActiveThemes(selectedTheme, colorModes, activeTheme)
        }
        theme={`hv-${selectedTheme}-${selectedMode}`}
        {...editorProps}
        {...others}
      />
    </StyledContainer>
  );
};
