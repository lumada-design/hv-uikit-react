import { Children, isValidElement, useCallback, useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";
import {
  ds3,
  ds5,
  HvProvider,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { useDocsTheme } from "../../hooks/useDocsTheme";
import useEditorTheme from "../../hooks/useEditorTheme";
import { Controls, type Control } from "./Controls";

type PlaygroundProps = {
  Component: React.ComponentType<{ children?: React.ReactNode }>;
  componentName: string;
  componentProps?: Record<string, unknown>;
  controls: Record<string, Control>;
  children?: React.ReactNode;
  decorator?: (children: React.ReactNode) => React.ReactNode;
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
      if (isValidElement(value)) return `${key}={${jsxToString(value)}}`;
      if (typeof value === "object") return `${key}={${JSON.stringify(value)}}`;
      if (typeof value === "boolean") return value ? key : `${key}={false}`;
      return `${key}={${value}}`;
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

export const Playground = ({
  Component,
  componentName,
  componentProps,
  controls = {},
  children,
  decorator,
}: PlaygroundProps) => {
  const editorTheme = useEditorTheme();
  const { docsTheme, docsMode } = useDocsTheme();

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
    <section className="[&>*]:border-border" aria-label="Playground">
      {/* Component preview and controls */}
      <div className="grid grid-cols-[2fr_1fr] border rounded-t-round">
        {/* Preview Area */}

        <div className={"grid place-items-center p-sm"}>
          <HvProvider
            themes={[pentahoPlus, ds5, ds3]}
            theme={docsTheme}
            colorMode={docsMode}
            cssTheme="scoped"
          >
            {decorator ? decorator(componentElement) : componentElement}
          </HvProvider>
        </div>

        {/* Controls Area */}
        <div className="flex flex-col gap-xs border-l border-color-inherit py-sm px-xs">
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
      <div className="max-h-100 overflow-auto rounded-b-round border border-t-0 max-h-250px">
        <CodeEditor
          readOnly
          className="font-mono text-[.85em]"
          value={code}
          theme={editorTheme}
        />
      </div>
    </section>
  );
};
