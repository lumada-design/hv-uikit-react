import React, { useCallback, useState } from "react";
import jsxToString from "react-element-to-jsx-string";
import { CodeEditor } from "react-live-runner";
import { classes } from "@docs/components/code/Live";
import { css } from "@emotion/css";
import { useData } from "nextra/hooks";
// @ts-ignore
import { themes } from "prism-react-renderer";
import {
  HvCheckBox,
  HvOption,
  HvRadio,
  HvRadioGroup,
  HvSelect,
  HvSlider,
} from "@hitachivantara/uikit-react-core";

type ControlType = "radio" | "slider";

type Control = {
  type?: ControlType;
  defaultValue?: string;
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
  const data = useData();

  const initialState = Object.keys(controls || {}).reduce(
    (state, prop) => {
      if (controls[prop].defaultValue) {
        state[prop] = controls[prop].defaultValue || "";
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

  const getControlRenderer = useCallback(
    (prop: string, control: Control) => {
      const propMeta = data?.meta.docgen.props[prop];

      if (control.type) {
        if (control.type === "slider") {
          const min = 1;
          const max = propMeta.type.value.length;

          const formattedLabel = (label: React.ReactNode) => {
            if (!label) return "";
            return propMeta.type.value[
              parseInt(label as string, 10) - 1
            ].value.replace(/"/g, "");
          };

          return (
            <HvSlider
              label={prop}
              hideInput
              minPointValue={min}
              maxPointValue={max}
              markStep={1}
              divisionQuantity={max - min}
              classes={{
                root: css({ width: "100%" }),
                sliderContainer: css({ padding: 10, paddingTop: 0 }),
                labelContainer: css({ marginLeft: 0, marginBottom: 8 }),
              }}
              values={[
                propMeta.type.value.findIndex(
                  (p: any) => p.value.replace(/"/g, "") === propsState[prop],
                ) + 1 ||
                  propMeta.type.value.findIndex(
                    (p: any) =>
                      p.value.replace(/"/g, "") === control.defaultValue,
                  ) + 1,
              ]}
              formatMark={(label) => formattedLabel(label)}
              formatTooltip={(label) => formattedLabel(label)}
              onChange={(values) => {
                handleSelectChange(
                  null,
                  prop,
                  propMeta.type.value[values[0] - 1]?.value.replace(/"/g, ""),
                );
              }}
            />
          );
        }
        if (control.type === "radio") {
          return (
            <HvRadioGroup
              label={prop}
              orientation="horizontal"
              value={propsState[prop] || control.defaultValue}
              onChange={(e, v) => handleSelectChange(e, prop, v)}
              classes={{
                root: css({ width: "100%" }),
              }}
            >
              {propMeta.type.value.map((v: any) => {
                const value = v.value.replace('"', "").replace('"', "");
                return <HvRadio key={value} label={value} value={value} />;
              })}
            </HvRadioGroup>
          );
        }
      }

      if (propMeta.type.name === "enum") {
        return (
          <HvSelect
            key={`${prop}`}
            value={propsState[prop] || control.defaultValue}
            style={{ minWidth: 100, width: "100%" }}
            label={prop}
            onChange={(e, value) => handleSelectChange(e, prop, value)}
          >
            {propMeta.type.value.map((v: any) => {
              const value = v.value.replace('"', "").replace('"', "");
              return (
                <HvOption value={value} key={value} label={value}>
                  {value}
                </HvOption>
              );
            })}
          </HvSelect>
        );
      }

      if (propMeta.type.name === "boolean") {
        return (
          <HvCheckBox
            key={`${prop}`}
            label={prop}
            checked={!!propsState[prop]}
            onChange={(e: React.ChangeEvent, value: any) =>
              handleSelectChange(e, prop, value)
            }
          />
        );
      }

      return <div>nothing to show...</div>;
    },
    [data?.meta.docgen.props, propsState],
  );

  if (!Component) return;

  const code = generateCode(
    componentName,
    propsState,
    componentProps || {},
    children?.props.children || "",
  );

  return (
    <>
      <div className="flex justify-between p-2 mt-1 border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        <div className="w-[70%] flex justify-center items-center">
          <Component {...propsState} {...componentProps}>
            {children?.props.children}
          </Component>
        </div>
        <div className="w-[30%] flex flex-col gap-[var(--uikit-space-xs)] justify-center items-center border-l border-[var(--uikit-colors-atmo3)] pl-[var(--uikit-space-xs)]">
          {Object.keys(controls || {}).map((prop) => {
            const control = controls[prop];
            if (!control) return null;

            const renderer = getControlRenderer(prop, control);
            return renderer;
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
