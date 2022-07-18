import React from "react";
import PropTypes from "prop-types";
import MonacoEditor from "react-monaco-editor";
import { withStyles, withTheme } from "@mui/styles";

import styles from "./styles";

export const DefaultCodeEditorOptions = {
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
 * Additional information regarding Tab trapping in Monaco, can be found here: https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide#tab-trapping
 */
const CodeEditor = ({ classes, theme, defaultValue, options, editorProps, ...others }) => {
  // merges the 2 objects together, overriding defaults with passed in options
  const mergedOptions = {
    ...DefaultCodeEditorOptions,
    ...options,
  };

  return (
    <div className={classes.root}>
      <MonacoEditor
        defaultValue={defaultValue}
        options={mergedOptions}
        editorWillMount={(monaco) => {
          monaco.editor.defineTheme("hv", {
            base: theme.hv.type === "light" ? "vs" : "vs-dark",
            inherit: true,
            rules: [{ background: theme.hv.palette.atmosphere.atmo1 }],
            colors: {
              "editor.background": theme.hv.palette.atmosphere.atmo1,
              "editorLineNumber.foreground": theme.hv.palette.atmosphere.atmo5,
            },
          });
        }}
        theme="hv"
        {...editorProps}
        {...others}
      />
    </div>
  );
};

CodeEditor.propTypes = {
  /*
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Style applied to the bor
     */
    headerIncluded: PropTypes.string,
  }).isRequired,
  /**
   * styling theme to be applied to the code editor
   */
  theme: PropTypes.any.isRequired,
  /**
   * The properties of the Monaco editor. Please check MonacoEditorProps from https://microsoft.github.io/monaco-editor/api/index.html
   */
  editorProps: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the code editor
   */
  defaultValue: PropTypes.string,
  /**
   * The function called when the written code changes
   * @param {*} value
   */
  onChange: PropTypes.func,
  /**
   * The properties of the editor object in Monaco. Please check editor.IEditorConstructionOptions in https://microsoft.github.io/monaco-editor/api/index.html
   */
  options: PropTypes.instanceOf(Object),
};

export default withStyles(styles)(withTheme(CodeEditor));
