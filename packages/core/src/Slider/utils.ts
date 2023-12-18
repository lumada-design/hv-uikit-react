import { CSSProperties } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import validationStates from "@core/Forms/FormElement/validationStates";
import { HvFormStatus } from "@core/Forms";

import { HvKnobProperty, HvMarkProperty } from "./types";
import { sliderStyles as styles } from "./Slider.styles";

/**
 * Transform the scaled values into knobs positions.
 *
 * @param {*} sliderValue - he value of the slider to be scaled
 * @param {*} minPointVlue - The value of the first point in the slider from left to right.
 * @param {*} stepVlue - The calculated separation between the values of the slider.
 */
export const knobsPositionToScaledValue = (
  sliderValue: number,
  minPointValue: number,
  stepValue: number
): number => minPointValue + stepValue * sliderValue;

/**
 * Transform the scaled values into knobs positions.
 *
 * @param {*} scaledValue - The value of the slider to be scaled
 * @param {*} minPointValue - The value of the first point in
 * the slider from left to right.
 * @param {*} inverseStepValue - The inverse of calculated separation between
 * the value of the points that compose the slider.
 */
export const scaledValueToKnobsPositionValue = (
  scaledValue: number | undefined,
  minPointValue: number,
  inverseStepValue: number
): number =>
  typeof scaledValue === "number"
    ? Math.floor((scaledValue - minPointValue) * inverseStepValue)
    : NaN;

/**
 * Transform the received knobs values into knob positions
 *
 * @param {Object} values - The values of the slider.
 * @param {Number} inverseStepValue - The inverse of calculated separation between
 * the value of the points that compose the slider.
 * @param {Integer} minPointValue - The value of the first point in the slider from
 * left to right.
 * @returns {Array} - The position of the knobs.
 */
export const knobsValuesToKnobsPositions = (
  values: (number | undefined)[],
  inverseStepValue: number,
  minPointValue: number
): number[] => {
  const knobsPositions: number[] = [];

  values.forEach((value, index) => {
    knobsPositions[index] = scaledValueToKnobsPositionValue(
      value,
      minPointValue,
      inverseStepValue
    );
  });

  return knobsPositions;
};

/**
 * Transform the received knobs positions into knob values
 *
 * @param {Object} knobPositions - The values of the slider.
 * @param {Number} stepValue - The calculated separation between
 * the value of the points that compose the slider.
 * @param {Integer} minPointValue - The value of the first point in the slider from
 * left to right.
 * @returns {Array} - The position of the knobs.
 */
export const knobsPositionsToKnobsValues = (
  knobPositions: number[],
  stepValue: number,
  minPointValue: number
): number[] => {
  const knobsValues: number[] = [];

  knobPositions.forEach((value, index) => {
    knobsValues[index] = knobsPositionToScaledValue(
      value,
      minPointValue,
      stepValue
    );
  });

  return knobsValues;
};

/**
 * Calculates the separation between each value in the slider.
 *
 * @param {*} maxPointValue - The value of the last point in the slider from left to right.
 * @param {*} minPointValue - The value of the first point in the slider from left to right.
 * @param {*} divisionQuantity - How many subdivisions there are in the slider.
 */
export const calculateStepValue = (
  maxPointValue: number,
  minPointValue: number,
  divisionQuantity: number
): number => Math.abs(maxPointValue - minPointValue) / divisionQuantity;

/**
 * Generates the inline styles used for the track of each knob, applying colors if necessary.
 *
 * @param {Object} markProperties - The object provided by the user with
 * the desired configuration for the marks.
 * @param {Integer} markstep - The separation between marks.
 * @param {Integer} divisionQuantity - How many subdivisions there are in the slider.
 * @param {Integer} minPointValue - The value of the first point in the slider from
 * left to right.
 * @param {Integer} stepValue - The calculated separation between the values of the slider.
 * @param {Integer} markDigits - How many decimals the mark will show.
 * @param {Function} formatMark - A function provided by the user that is going to
 * be executed to format the mark text.
 * @param {Object} styles - the default styles for the marks.
 * @returns {Object} - An object with the for the marks.
 * @memberof HvSlider
 */
export const createMark = (
  markProperties: HvMarkProperty[],
  markstep: number,
  divisionQuantity: number,
  minPointValue: number,
  stepValue: number,
  markDigits: number,
  disabled: boolean,
  formatMark: (label: React.ReactNode) => React.ReactNode = (mark) => mark
): {
  [key: number]: {
    label: string;
    style: CSSProperties;
  };
} => {
  const marks: {
    [key: number]: {
      label: string;
      style: CSSProperties;
    };
  } = {};

  if (markProperties.length > 0) {
    markProperties.forEach((markProperty) => {
      if (typeof markProperty.position === "number") {
        marks[markProperty.position] = disabled
          ? {
              label: `${markProperty.label}`,
              style: {
                ...styles.disabledMark,
              },
            }
          : {
              label: `${markProperty.label}`,
              style: {
                ...styles.mark,
              },
            };
      }
    });
  } else {
    const roundedMarkStep = Math.floor(markstep);

    for (let index = 0; index <= divisionQuantity; index += roundedMarkStep) {
      let labelValue: React.ReactNode = knobsPositionToScaledValue(
        index,
        minPointValue,
        stepValue
      ).toFixed(markDigits);

      labelValue = formatMark?.(labelValue) || labelValue;

      marks[index] = disabled
        ? {
            label: `${labelValue}`,
            style: {
              ...styles.disabledMark,
            },
          }
        : {
            label: `${labelValue}`,
            style: {
              ...styles.mark,
            },
          };
    }
  }

  return marks;
};

/**
 * Generates the inline styles used for the track of each knob, applying colors if necessary.
 *
 * @param {Object} knobProperties - The object provided by the user with
 * the desired configuration for the knobs.
 * @param {Object} styles - the default styles for the tracks.
 * @returns {Object} - An object with the style for each track.
 * @memberof HvSlider
 */
export const createTrackStyles = (
  knobProperties: HvKnobProperty[]
): CSSProperties[] => {
  const trackStyles: CSSProperties[] = [];

  if (knobProperties.length > 0) {
    knobProperties.forEach((knobProperty, index) => {
      trackStyles[index] = { ...styles.track };
      if (knobProperty.color) {
        trackStyles[index].backgroundColor = knobProperty.trackColor;
      }
    });
  }

  return trackStyles;
};

/**
 * Generates the inline styles used for each knob, applying colors if specified.
 *
 * @param {Object} knobProperties - The object provided by the user with
 * the desired configuration for the knobs.
 * @param {Object} styles - the default styles for the knobs.
 * @returns {Object} - An object with both the inner and outer styles for the knob.
 * @memberof HvSlider
 */
export const createKnobStyles = (
  knobProperties: HvKnobProperty[]
): {
  knobInner: CSSProperties[];
  knobOuterStyle: CSSProperties[];
} => {
  const knobInner: CSSProperties[] = [];
  const knobOuterStyle: CSSProperties[] = [];

  const lastItem = knobProperties.length - 1;
  if (knobProperties.length > 0) {
    knobProperties.forEach((knobProperty, index) => {
      knobInner[index] = { ...styles.knobInner };
      knobOuterStyle[index] = { ...styles.knobOuter };

      if (knobProperty.color) {
        knobInner[index].backgroundColor = knobProperty.color;
        knobOuterStyle[index].backgroundColor = "transparent";
      }

      if (knobProperty.hidden) {
        knobInner[index] = styles.knobHidden;
        if (index === lastItem) {
          knobInner[index] = { ...styles.knobHiddenLast };
          knobInner[index].backgroundColor = knobProperty.color;
          knobOuterStyle[index] = { ...styles.knobHidden };
          knobOuterStyle[index].backgroundColor = knobProperty.color;
        }
      }
    });
  }

  return {
    knobInner,
    knobOuterStyle,
  };
};

/**
 * Analyzes both the values and the default values to determine whether the slider is working in single mode.
 *
 * @param {Array} values - the values where the knobs are positioned when controlled.
 * @param {Array} defaultValues - the values where the knobs start when uncontrolled.
 * @returns {Boolean} - if true the slider should work as single slider
 */
export const isSingleSlider = (
  values: number[],
  defaultValues: (number | undefined)[]
): boolean => {
  if (!(values?.length > 1)) {
    return defaultValues.length === 1;
  }
  return values.length === 1;
};

/**
 * Generates the default knob styles for each knob
 *
 * @param {Object} knobProperties - The object provided by the user with
 * the desired configuration for the knobs.
 * @param {Integer} numberOfKnobs - the default styles for the knobs.
 * @param {Object} theme - The theme to extract the colors.
 *
 * @returns {Object} - An object with both the inner and outer styles for the knob.
 * @memberof HvSlider
 */
export const generateDefaultKnobProperties = (
  numberOfKnobs: number = 1,
  disabled: boolean = false,
  knobPropertiesProp?: HvKnobProperty[]
): HvKnobProperty[] => {
  let knobProperties = knobPropertiesProp || [];

  const defaultKnobStyles = {
    color: theme.colors.secondary,
    hoverColor: theme.colors.secondary,
    trackColor: theme.colors.secondary,
    dragColor: theme.colors.secondary,
    knobRingColor: theme.colors.atmo1,
  };

  const disabledKnobStyles = {
    color: theme.colors.secondary_60,
    hoverColor: theme.colors.secondary_60,
    trackColor: theme.colors.secondary_60,
    dragColor: theme.colors.secondary_60,
    knobRingColor: theme.colors.secondary_60,
  };

  if (knobProperties.length > 0) {
    knobProperties = knobProperties.slice(0, numberOfKnobs);
    knobProperties = knobProperties.map((knobProperty) => {
      if (!disabled) {
        return {
          ...disabledKnobStyles,
          ...knobProperty,
        };
      }
      return {
        ...defaultKnobStyles,
        ...knobProperty,
      };
    });
  } else {
    for (let i = 0; i < numberOfKnobs; i += 1) {
      if (!disabled) knobProperties.push(defaultKnobStyles);
      if (disabled) knobProperties.push(disabledKnobStyles);
    }
  }

  return knobProperties;
};

const pushSlider = (
  index: number,
  inputIndex: number,
  inputValue: number
): number => {
  const difference = index - inputIndex;

  return inputValue + difference;
};

export const ensureValuesConsistency = (
  knobPositions: number[],
  inputIndex: number
): number[] => {
  const newKnobsPosition: number[] = [...knobPositions];

  newKnobsPosition.forEach((value, index) => {
    if (Number.isNaN(value) || value == null) {
      newKnobsPosition[index] = pushSlider(
        index,
        inputIndex,
        newKnobsPosition[inputIndex]
      );
    } else if (index < inputIndex && value > newKnobsPosition[inputIndex]) {
      newKnobsPosition[index] = pushSlider(
        index,
        inputIndex,
        newKnobsPosition[inputIndex]
      );
    } else if (index > inputIndex && value < newKnobsPosition[inputIndex]) {
      newKnobsPosition[index] = pushSlider(
        index,
        inputIndex,
        newKnobsPosition[inputIndex]
      );
    }
  });

  return newKnobsPosition;
};

export const convertStatusToArray = (
  length: number,
  status?: HvFormStatus | HvFormStatus[]
): {
  arrayStatus?: HvFormStatus[];
  arrayDefaultStatus: (keyof typeof validationStates)[];
} => {
  const result: {
    arrayStatus?: HvFormStatus[];
    arrayDefaultStatus: (keyof typeof validationStates)[];
  } = {
    arrayDefaultStatus: Array.from({ length }, () => validationStates.standBy),
  };

  if (status == null) {
    return result;
  }
  if (!Array.isArray(status)) {
    result.arrayStatus = Array.from({ length }, () => status);
    return result;
  }
  result.arrayStatus = status;

  return result;
};

export const statusArrayToFormStatus = (
  arrayStatus: HvFormStatus[]
): keyof typeof validationStates => {
  const invalid = arrayStatus.some(
    (status) => status === validationStates.invalid
  );

  if (invalid) return validationStates.invalid;

  const valid = arrayStatus.some((status) => status === validationStates.valid);

  if (valid) return validationStates.valid;

  return validationStates.standBy;
};

export const knobsValuesToString = (
  knobsValues: number[],
  markDigits: number
): string[] =>
  knobsValues.map((knobValue) =>
    Number.isNaN(knobValue) ? "" : knobValue.toFixed(markDigits)
  );

export const stringValuesToKnobs = (inputsValues: string[]): number[] =>
  inputsValues.map((inputValue) => parseFloat(inputValue));
