import { useEffect, useState } from "react";

import { Remove } from "@hitachivantara/uikit-react-icons";

import { setId } from "@core/utils/setId";
import { HvFormStatus } from "@core/Forms";
import { HvInput, HvInputProps } from "@core/Input";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { knobsValuesToString, stringValuesToKnobs } from "../utils";
import { staticClasses, useClasses } from "./SliderInput.styles";

export { staticClasses as sliderInputClasses };

export type HvSliderInputClasses = ExtractNames<typeof useClasses>;

export interface HvSliderInputProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  /**
   * Used to generate the aria-label for the inputs.
   */
  label?: React.ReactNode;
  /**
   * Input status.
   */
  status?: HvFormStatus[];
  /**
   * The values array to apply to the component
   */
  values?: number[];
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange?: (values: number[], index: number) => void;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: HvInputProps[];
  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is read only.
   */
  readOnly?: boolean;
  /**
   * Indicates how many decimals to use.
   */
  markDigits?: number;
  /**
   * Styles applied from the theme.
   */
  classes?: HvSliderInputClasses;
}

export const HvSliderInput = ({
  classes: classesProp,
  className,
  id,
  label,
  status,
  values: valuesProp = [],
  inputProps = [],
  readOnly = false,
  disabled = false,
  markDigits = 0,
  onChange,
  ...others
}: HvSliderInputProps) => {
  const { classes, cx } = useClasses(classesProp);

  const [inputValues, setInputValues] = useState<string[]>(
    knobsValuesToString(valuesProp, markDigits)
  );

  const handleChange = (index: number) => {
    if (disabled) return;

    onChange?.(stringValuesToKnobs(inputValues), index);
  };

  useEffect(() => {
    setInputValues(knobsValuesToString(valuesProp, markDigits));
  }, [markDigits, valuesProp]);

  return (
    <div className={cx(classes.inputRoot, className)} {...others}>
      {inputValues.map((value, index) => (
        <div key={setId(id, index)} className={classes.inputContainer}>
          {index !== 0 && <Remove color={disabled ? ["atmo4"] : undefined} />}
          <HvInput
            id={setId(id, index)}
            aria-label={`${label}-${index}`}
            className={classes.input}
            disabled={disabled}
            type="number"
            value={Number.isNaN(value) || value == null ? "" : value.toString()}
            onEnter={() => handleChange(index)}
            onBlur={() => handleChange(index)}
            onChange={(_, inputValue) => {
              const newValues = [...inputValues];
              newValues[index] = inputValue;
              setInputValues(newValues);
            }}
            status={status?.[index] || "standBy"}
            readOnly={readOnly}
            disableClear
            {...inputProps[index]}
          />
        </div>
      ))}
    </div>
  );
};
