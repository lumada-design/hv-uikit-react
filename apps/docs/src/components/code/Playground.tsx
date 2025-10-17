"use client";

import { Children, isValidElement, useCallback, useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";

import { ComponentMeta } from "../../utils/component";
import { Controls, type Control } from "./Controls";
import { DocsProvider } from "./DocsProvider";

export interface PlaygroundProps {
  Component: React.ComponentType<{ children?: React.ReactNode }>;
  componentName: string;
  componentProps?: Record<string, unknown>;
  meta?: ComponentMeta;
  controls: Record<string, Control>;
  children?: React.ReactNode;
  decoratorClassName?: string;
}

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
  meta,
  componentProps,
  controls = {},
  children,
  decoratorClassName,
}: PlaygroundProps) => {
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
    <section
      data-pagefind-ignore
      className="[&>*]:border-border"
      aria-label="Playground"
    >
      {/* Component preview and controls */}
      <DocsProvider className="grid grid-cols-[2fr_1fr] border rounded-t-round">
        {/* Preview Area */}
        <div className="grid place-items-center rounded-inherit p-sm h-full">
          {decoratorClassName ? (
            <div className={decoratorClassName}>{componentElement}</div>
          ) : (
            componentElement
          )}
        </div>

        {/* Controls Area */}
        <div className="rounded-inherit border-l border-color-inherit h-full">
          <div className="flex flex-col gap-xs py-sm px-xs">
            {Object.entries(controls).map(([prop, control]) => {
              if (!control) return null;

              return (
                <Controls
                  key={prop}
                  prop={prop}
                  meta={meta}
                  state={dynamicProps}
                  control={control}
                  onChange={updatePropValue}
                />
              );
            })}
          </div>
        </div>
      </DocsProvider>

      {/* Code editor */}
      <div className="max-h-100 overflow-auto rounded-b-round border border-t-0 max-h-250px">
        <CodeEditor readOnly className="font-mono text-[.85em]" value={code} />
      </div>
    </section>
  );
};
