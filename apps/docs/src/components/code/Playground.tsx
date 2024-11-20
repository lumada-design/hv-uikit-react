import React, { useCallback, useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";
import { useData } from "nextra/hooks";

import { Controls, type Control } from "./Controls";

type PlaygroundProps = {
  Component: React.ComponentType<{ children?: React.ReactNode }>;
  componentName: string;
  componentProps?: Record<string, unknown>;
  controls: Record<string, Control>;
  children?: React.ReactNode;
};

const generateCode = (
  componentName: string,
  propsState: Record<string, string>,
  componentProps: Record<string, string>,
  children: React.ReactNode,
): string => {
  // Helper function to format component attributes
  const formatAttributes = (props: Record<string, string>) => {
    return Object.entries(props)
      .filter(
        ([key, value]) =>
          key !== "style" && (typeof value !== "boolean" || value),
      )
      .map(([key, value]) =>
        typeof value === "boolean" ? key : `${key}="${value}"`,
      )
      .join(" ");
  };

  // Format props and componentProps into strings
  const propsString = formatAttributes(propsState);
  const componentPropsString = formatAttributes(componentProps || {});

  // Handle children content
  let childrenString = "";
  if (React.isValidElement(children)) {
    childrenString = jsxToString(children);
  } else if (typeof children === "string") {
    childrenString = children;
  }

  // Generate and return the final code
  if (childrenString) {
    return `<${componentName} ${propsString} ${componentPropsString}>
${childrenString}
</${componentName}>`;
  }

  return `<${componentName} ${propsString} ${componentPropsString} />`.trim();
};

const Playground = ({
  Component,
  componentName,
  componentProps,
  controls = {},
  children,
}: PlaygroundProps) => {
  const controlData = useData();
  const editorTheme = useEditorTheme();

  // Initialize dynamic props with default values from controls
  const [dynamicProps, setDynamicProps] = useState<Record<string, unknown>>(
    () =>
      Object.entries(controls).reduce<
        Record<string, string | number | boolean>
      >((acc, [key, control]) => {
        acc[key] = control.defaultValue ?? "";
        return acc;
      }, {}),
  );

  // Update dynamic prop values
  const updatePropValue = useCallback((prop: string, value: unknown) => {
    setDynamicProps((prevProps) => ({
      ...prevProps,
      [prop]: value,
    }));
  }, []);

  // Return null if no Component is provided
  if (!Component) return null;

  // Generate the code representation for the component
  const code = generateCode(
    componentName,
    Object.fromEntries(
      Object.entries(dynamicProps).map(([key, value]) => [key, String(value)]),
    ),
    (componentProps as Record<string, string>) || {},
    children || "",
  );

  return (
    <>
      {/* Component preview and controls */}
      <div className="grid grid-cols-[2fr_1fr] border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        {/* Preview Area */}
        <div className="flex justify-center items-center p-sm">
          <Component {...componentProps} {...dynamicProps}>
            {children}
          </Component>
        </div>

        {/* Controls Area */}
        <div className="grid gap-xs border-l border-[var(--uikit-colors-atmo4)] p-sm pl-xs">
          {Object.entries(controls).map(([prop, control]) => {
            if (!control) return null;

            return (
              <Controls
                key={prop}
                prop={prop}
                state={dynamicProps}
                control={control}
                data={controlData}
                onChange={updatePropValue}
              />
            );
          })}
        </div>
      </div>

      {/* Code editor */}
      <div className="max-h-72 overflow-auto rounded-b-round border border-[var(--uikit-colors-atmo4)] border-t-0">
        <CodeEditor
          readOnly
          className="font-mono text-sm leading-2.2"
          value={code}
          theme={editorTheme}
        />
      </div>
    </>
  );
};

export default Playground;
