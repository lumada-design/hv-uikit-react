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
  HvColorPicker,
  HvInput,
  HvOption,
  HvRadio,
  HvRadioGroup,
  HvSelect,
  HvSlider,
  useTheme,
} from "@hitachivantara/uikit-react-core";

type ControlType = "radio" | "check" | "slider" | "color" | "text";

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
    .filter(
      ([key, value]) =>
        key !== "style" && (typeof value !== "boolean" || value),
    )
    .map(([key, value]) =>
      typeof value === "boolean" ? key : `${key}="${value}"`,
    )
    .filter(Boolean)
    .join(" ");

  const componentPropsString = Object.entries(componentProps || {})
    .filter(
      ([key, value]) =>
        key !== "style" && (typeof value !== "boolean" || value),
    )
    .map(([key, value]) =>
      typeof value === "boolean" ? key : `${key}="${value}"`,
    )
    .filter(Boolean)
    .join(" ");

  const childrenString =
    typeof children === "string"
      ? children
      : React.isValidElement(children)
        ? jsxToString(children)
        : "";

  if (childrenString !== "") {
    return `
<${componentName} ${propsString} ${componentPropsString}>
${childrenString}
</${componentName}>`.replace(" >", ">");
  }
  return `<${componentName} ${propsString} ${componentPropsString} />`.replace(
    /\s+/g,
    " ",
  );
};

export const Playground = ({
  Component,
  componentName,
  componentProps,
  controls = {},
  children,
}: PlaygroundProps) => {
  const data = useData();
  const { colors } = useTheme();

  const [propsState, setPropsState] = useState(() =>
    Object.keys(controls).reduce<Record<string, string>>((state, prop) => {
      if (controls[prop].defaultValue) {
        state[prop] = controls[prop].defaultValue || "";
      }
      return state;
    }, {}),
  );

  const handleSelectChange = (prop: string, value: any) => {
    setPropsState((prevState) => ({ ...prevState, [prop]: value }));
  };

  const getControlRenderer = useCallback(
    (prop: string, control: Control) => {
      const propMeta = data?.meta.docgen.props[prop];

      const type: ControlType = control?.type || propMeta?.type.name || "text";

      const renderSlider = () => {
        const min = 1;
        const max = propMeta.type.value.length;

        const formatLabel = (label: React.ReactNode) => {
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
            formatMark={formatLabel}
            formatTooltip={formatLabel}
            onChange={(values) => {
              handleSelectChange(
                prop,
                propMeta.type.value[values[0] - 1]?.value.replace(/"/g, ""),
              );
            }}
          />
        );
      };

      const renderRadio = () => {
        return (
          <HvRadioGroup
            label={prop}
            orientation="horizontal"
            value={propsState[prop] || control.defaultValue}
            onChange={(e, v) => handleSelectChange(prop, v)}
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
      };

      const renderSelect = () => {
        return (
          <HvSelect
            key={`${prop}`}
            value={propsState[prop] || control.defaultValue}
            style={{ minWidth: 100, width: "100%" }}
            label={prop}
            onChange={(e, value) => handleSelectChange(prop, value)}
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
      };

      const renderCheck = () => {
        return (
          <HvCheckBox
            key={`${prop}`}
            label={prop}
            checked={!!propsState[prop]}
            onChange={(e, value) => handleSelectChange(prop, value)}
          />
        );
      };

      const renderInput = () => {
        const inputValue = propsState[prop] ?? control.defaultValue;
        return (
          <HvInput
            key={`${prop}`}
            label={prop}
            value={inputValue}
            onChange={(e, value) => handleSelectChange(prop, value)}
            classes={{ root: css({ width: "100%" }) }}
          />
        );
      };

      const renderColor = () => {
        const colorValue = propsState[prop].includes("#")
          ? propsState[prop]
          : colors?.[propsState[prop]] || control.defaultValue;
        return (
          <HvColorPicker
            key={`${prop}`}
            label={prop}
            value={colorValue}
            onChange={(value) => handleSelectChange(prop, value)}
            classes={{ root: css({ width: "100%" }) }}
          />
        );
      };

      switch (true) {
        case type === "slider" && propMeta?.type.name === "enum":
          return renderSlider();
        case type === "radio" && propMeta?.type.name === "enum":
          return renderRadio();
        case type === "text":
          return renderInput();
        case type === "color":
          return renderColor();
        case type === "check":
        case propMeta?.type.name === "boolean":
          return renderCheck();
        case propMeta?.type.name === "enum":
          return renderSelect();
        default: {
          // eslint-disable-next-line no-console
          console.error(`Control for "${prop}" not supported: ${type}`);
          return null;
        }
      }
    },
    [colors, data?.meta.docgen.props, propsState],
  );

  if (!Component) return;

  const code = generateCode(
    componentName,
    propsState,
    componentProps || {},
    children || "",
  );

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        <div className="flex justify-center items-center p-sm">
          <Component {...componentProps} {...propsState}>
            {children}
          </Component>
        </div>
        <div className="grid gap-xs border-l border-[var(--uikit-colors-atmo3)] p-sm pl-xs">
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
          theme={themes.vsDark}
        />
      </div>
    </>
  );
};

export default Playground;
