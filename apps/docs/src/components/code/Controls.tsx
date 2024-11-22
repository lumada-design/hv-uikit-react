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

type ControlType = "radio" | "check" | "slider" | "color" | "text";

export type Control = {
  type?: ControlType;
  defaultValue?: string;
  values?: string[];
};

type ControlsProps = {
  prop: string;
  state: Record<string, any>;
  control: Control;
  data: Record<string, any>;
  onChange: (prop: string, value: unknown) => void;
};

export const Controls = ({
  prop,
  state,
  control,
  data,
  onChange,
}: ControlsProps) => {
  const { colors } = useTheme();
  const propMeta = data?.meta.docgen.props[prop];
  const type = control?.type || propMeta?.type?.name || "text";

  // Utility to clean up values (e.g., remove quotes)
  const cleanValue = (value: string) => value.replace(/"/g, "");

  // Utility to extract options from prop metadata
  const getOptions = () => propMeta?.type?.value || [];

  // Find the index of the current value in the options
  const findCurrentIndex = (value: string) =>
    getOptions().findIndex(
      (opt: OptionType) => cleanValue(opt.value) === value,
    ) + 1;

  // Render slider control for enum types with multiple options
  const renderSliderControl = () => {
    const options = getOptions();
    const max = options.length;

    return (
      <HvSlider
        label={prop}
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
      label={prop}
      orientation="horizontal"
      value={state[prop] || control.defaultValue}
      onChange={(e, value) => onChange(prop, value)}
      className="w-full"
    >
      {getOptions().map((v: OptionType) => {
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
      label={prop}
      className="w-full min-w-[100px]"
      onChange={(e, value) => onChange(prop, value ?? "")}
    >
      {getOptions().map((v: OptionType) => {
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
      label={prop}
      checked={!!state[prop]}
      onChange={(e, value) => onChange(prop, value)}
    />
  );

  // Render text input for default text types
  const renderInputControl = () => (
    <HvInput
      key={prop}
      label={prop}
      value={String(state[prop] || control.defaultValue)}
      onChange={(e, value) => onChange(prop, value)}
      className="w-full"
    />
  );

  // Render color picker for color types
  const renderColorControl = () => (
    <HvColorPicker
      key={prop}
      label={prop}
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
    boolean: renderCheckboxControl,
    color: renderColorControl,
    text: renderInputControl,
    enum: renderSelectControl,
  };

  // Render the appropriate control or log an error if unsupported
  const renderControl = rendererMap[type];
  if (renderControl) {
    return renderControl();
  }

  // @eslint-disable-next-line no-console
  console.error(`Control for "${prop}" not supported: ${type}`);
  return null;
};