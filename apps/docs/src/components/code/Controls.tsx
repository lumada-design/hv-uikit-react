import { useData } from "nextra/hooks";
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

type OptionType = {
  value: string;
};

type ControlType =
  | "check"
  | "color"
  | "number"
  | "radio"
  | "select"
  | "slider"
  | "text";

export type Control = {
  type?: ControlType;
  defaultValue?: any;
  values?: string[];
};

type ControlsProps = {
  prop: string;
  state: Record<string, any>;
  control: Control;
  onChange: (prop: string, value: unknown) => void;
};

const defaultMap: Record<string, ControlType> = {
  string: "text",
  number: "number",
  boolean: "check",
  enum: "select",
};

export const Controls = ({ prop, state, control, onChange }: ControlsProps) => {
  const { colors } = useTheme();
  const { meta } = useData();
  const propMeta = meta.docgen.props[prop];

  const type: ControlType =
    control?.type ||
    defaultMap[propMeta?.type?.name] ||
    defaultMap[typeof control.defaultValue] ||
    "text";

  // Utility to clean up values (e.g., remove quotes)
  const cleanValue = (value: string) => value.replace(/"/g, "");

  // Utility to extract options from prop metadata
  const getOptions = (): OptionType[] => propMeta?.type?.value || [];

  // Find the index of the current value in the options
  const findCurrentIndex = (value: string) =>
    getOptions().findIndex((opt) => cleanValue(opt.value) === value) + 1;

  // TODO: consider adding `capitalize` or  `nextra-code`
  const propLabel = <code>{prop}</code>;

  // Render slider control for enum types with multiple options
  const renderSliderControl = () => {
    const options = getOptions();
    const max = options.length;

    return (
      <HvSlider
        label={propLabel}
        hideInput
        minPointValue={1}
        maxPointValue={max}
        markStep={1}
        divisionQuantity={max - 1}
        className="w-full px-2 pt-0"
        values={[
          findCurrentIndex(String(state[prop])) ||
            findCurrentIndex(String(control.defaultValue)),
        ]}
        formatMark={(value) =>
          cleanValue(options[Number(value) - 1]?.value || "")
        }
        formatTooltip={(value) =>
          cleanValue(options[Number(value) - 1]?.value || "")
        }
        onChange={(values) =>
          onChange(prop, cleanValue(options[values[0] - 1]?.value))
        }
      />
    );
  };

  // Render radio button group for enum types
  const renderRadioControl = () => (
    <HvRadioGroup
      label={propLabel}
      orientation="horizontal"
      value={state[prop] || control.defaultValue}
      onChange={(e, value) => onChange(prop, value)}
      className="w-full"
    >
      {getOptions().map((v) => {
        const value = cleanValue(v.value);
        return <HvRadio key={value} label={value} value={value} />;
      })}
    </HvRadioGroup>
  );

  // Render select dropdown for enum types
  const renderSelectControl = () => (
    <HvSelect
      key={prop}
      value={state[prop] || control.defaultValue}
      label={propLabel}
      className="w-full min-w-[100px]"
      onChange={(e, value) => onChange(prop, value ?? "")}
    >
      {getOptions().map((v) => {
        const value = cleanValue(v.value);
        return (
          <HvOption value={value} key={value} label={value}>
            {value}
          </HvOption>
        );
      })}
    </HvSelect>
  );

  // Render checkbox for boolean types
  const renderCheckboxControl = () => (
    <HvCheckBox
      key={prop}
      label={propLabel}
      checked={!!state[prop]}
      onChange={(e, value) => onChange(prop, value)}
    />
  );

  // Render text input for default text types
  const renderInputControl = () => (
    <HvInput
      key={prop}
      label={propLabel}
      value={String(state[prop] ?? control.defaultValue)}
      onChange={(e, value) => onChange(prop, value)}
      className="w-full"
      disableClear
    />
  );

  // Render number input for default text types
  const renderNumberInputControl = () => (
    <HvInput
      key={prop}
      label={propLabel}
      inputProps={{ type: "number" }}
      value={state[prop] ?? control.defaultValue}
      onChange={(e, value) => onChange(prop, Number(value))}
      className="w-full"
      disableClear
    />
  );

  // Render color picker for color types
  const renderColorControl = () => (
    <HvColorPicker
      key={prop}
      label={propLabel}
      value={
        typeof state[prop] === "string" && state[prop].includes("#")
          ? state[prop]
          : colors?.[state[prop] as string] || control.defaultValue
      }
      onChange={(value) => onChange(prop, value)}
      className="w-full"
    />
  );

  // Map of renderers for specific control types
  const rendererMap: Record<string, () => JSX.Element | null> = {
    slider: () =>
      propMeta?.type?.name === "enum" ? renderSliderControl() : null,
    radio: () =>
      propMeta?.type?.name === "enum" ? renderRadioControl() : null,
    check: renderCheckboxControl,
    color: renderColorControl,
    number: renderNumberInputControl,
    text: renderInputControl,
    select: renderSelectControl,
  };

  // Render the appropriate control or log an error if unsupported
  const renderControl = rendererMap[type];
  if (renderControl) {
    return renderControl();
  }

  // eslint-disable-next-line no-console
  console.error(`Control for "${prop}" not supported: ${type}`);
  return null;
};
