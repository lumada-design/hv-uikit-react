import React, { useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";
import { classes } from "@docs/components/code/Live";
// @ts-ignore
import { themes } from "prism-react-renderer";
import {
  HvCheckBox,
  HvOption,
  HvSelect,
  theme,
} from "@hitachivantara/uikit-react-core";

type Control = {
  type: string;
  defaultValue: string;
  values?: string[];
};

type Controls = Record<string, Control>;

type PlaygroundProps = {
  Component: any;
  componentName: string;
  componentProps?: Record<string, any>;
  controls: Controls;
  children?: any;
};

const generateCode = (
  componentName: string,
  propsState: Record<string, string>,
  componentProps: Record<string, string>,
  children: React.ReactNode,
) => {
  const propsString = Object.entries(propsState)
    .map(([key, value]) =>
      typeof value === "boolean" && value
        ? key
        : "boolean" && !value
          ? ""
          : `${key}="${value}"`,
    )
    .join(" ")
    .trim();

  const componentPropsString = Object.entries(componentProps || {})
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  const childrenString =
    typeof children === "string"
      ? children
      : React.isValidElement(children)
        ? jsxToString(children)
        : "";

  if (childrenString !== "") {
    return `<${componentName} ${propsString} ${componentPropsString}>${childrenString}</${componentName}>`.replace(
      " >",
      ">",
    );
  }
  return `<${componentName} ${propsString} ${componentPropsString} />`;
};

export const Playground = ({
  Component,
  componentName,
  componentProps,
  controls,
  children,
}: PlaygroundProps) => {
  const initialState = Object.keys(controls || {}).reduce(
    (state, prop) => {
      if (controls[prop].defaultValue) {
        state[prop] = controls[prop].defaultValue;
      }
      return state;
    },
    {} as Record<string, string>,
  );

  const [propsState, setPropsState] =
    useState<Record<string, string>>(initialState);

  const handleSelectChange = (event: any, prop: string, value: any) => {
    setPropsState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  if (!Component) return;

  const code = generateCode(
    componentName,
    propsState,
    componentProps || {},
    children?.props.children || "",
  );

  return (
    <>
      <div className="flex justify-between gap-3 p-2 mt-1 border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Component {...propsState} {...componentProps}>
            {children?.props.children}
          </Component>
        </div>
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: theme.space.xs,
            justifyContent: "center",
            alignItems: "center",
            borderLeft: `1px solid ${theme.colors.atmo3}`,
            paddingLeft: theme.space.sm,
          }}
        >
          {Object.keys(controls || {}).map((prop, index) => {
            const control = controls[prop];

            if (control.type === "select" && control.values) {
              return (
                <HvSelect
                  key={`${control.type}-${index}`}
                  value={propsState[prop] || control.defaultValue}
                  onChange={(e, value) => handleSelectChange(e, prop, value)}
                  style={{ width: 200 }}
                  label={prop}
                >
                  {control.values.map((value: string) => (
                    <HvOption value={value} key={value} label={value}>
                      {value}
                    </HvOption>
                  ))}
                </HvSelect>
              );
            }

            if (control.type === "check") {
              return (
                <HvCheckBox
                  key={`${control.type}-${index}`}
                  label={prop}
                  checked={!!propsState[prop]}
                  onChange={(e: React.ChangeEvent, value: any) =>
                    handleSelectChange(e, prop, value)
                  }
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className={classes.editorContainer}>
        <CodeEditor
          readOnly
          className={classes.editor}
          value={code}
          theme={themes.dracula}
        />
      </div>
    </>
  );
};

export default Playground;
