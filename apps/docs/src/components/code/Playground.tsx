import { Children, isValidElement, useCallback, useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";

import { Controls, type Control } from "./Controls";

type PlaygroundProps = {
  Component: React.ComponentType<{ children?: React.ReactNode }>;
  componentName: string;
  componentProps?: Record<string, unknown>;
  controls: Record<string, Control>;
  children?: React.ReactNode;
  decorator?: (component: JSX.Element) => JSX.Element;
};

const parseChildren = (child: React.ReactNode) =>
  (isValidElement(child) && jsxToString(child)) ||
  (typeof child === "string" && child) ||
  "";

const generateCode = (
  componentName: string,
  componentProps: Record<string, unknown> = {},
  children?: React.ReactNode | React.ReactNode[],
): string => {
  // Format props and componentProps into strings
  const parsedPropsString = Object.entries(componentProps)
    .filter(([key]) => key !== "style")
    .map(([key, value]) => {
      if (typeof value === "string") return `${key}="${value}"`;
      if (typeof value === "boolean") return value ? key : `${key}={false}`;
      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean)
    .map((str) => `  ${str}\n`)
    .join("");
  const componentPropsString = parsedPropsString && `\n${parsedPropsString}`;

  // Handle children content
  const childrenString = Children.toArray(children)
    .map(parseChildren)
    .filter(Boolean)
    .join("\n");

  // Generate and return the final code
  if (childrenString) {
    return `<${componentName} ${componentPropsString}>
  ${String(childrenString).replaceAll("\n", "\n  ")}
</${componentName}>`;
  }

  return `<${componentName} ${componentPropsString}/>`.trim();
};

const Playground = ({
  Component,
  componentName,
  componentProps,
  controls = {},
  children,
  decorator,
}: PlaygroundProps) => {
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
    { ...dynamicProps, ...componentProps },
    children,
  );

  const componentElement = (
    <Component {...componentProps} {...dynamicProps}>
      {children}
    </Component>
  );

  return (
    <>
      {/* Component preview and controls */}
      <div className="grid grid-cols-[2fr_1fr] border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        {/* Preview Area */}
        <div className="flex justify-center items-center p-sm">
          {decorator ? decorator(componentElement) : componentElement}
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
