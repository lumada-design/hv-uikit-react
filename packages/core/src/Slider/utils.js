import validationStates from "../Forms/FormElement/validationStates";

/**
 * Transform the scaled values into knobs positions.
 *
 * @param {*} sliderValue - the value of the slider to be scaled
 * @param {*} minPointVlue - The value of the first point in the slider from left to right.
 * @param {*} stepVlue - The calculated separation between the values of the slider.
 */
export const knobsPositionToScaledValue = (sliderValue, minPointVlue, stepVlue) =>
  minPointVlue + stepVlue * sliderValue;

/**
 * Transform the scaled values into knobs positions.
 *
 * @param {*} scaledValue - the value of the slider to be scaled
 * @param {*} minPointValue - The value of the first point in
 * the slider from left to right.
 * @param {*} inverseStepValue - The inverse of calculated separation between
 * the value of the points that compose the slider.
 */
export const scaledValueToKnobsPositionValue = (scaledValue, minPointValue, inverseStepValue) =>
  Math.floor((scaledValue - minPointValue) * inverseStepValue);

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
export const knobsValuesToKnobsPositions = (values, inverseStepValue, minPointValue) => {
  const knobsPositions = [];
  values.forEach((value, index) => {
    knobsPositions[index] = scaledValueToKnobsPositionValue(value, minPointValue, inverseStepValue);
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
export const knobsPositionsToKnobsValues = (knobPositions, stepValue, minPointValue) => {
  const knobsValues = [];
  knobPositions.forEach((value, index) => {
    knobsValues[index] = knobsPositionToScaledValue(value, minPointValue, stepValue);
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
export const calculateStepValue = (maxPointValue, minPointValue, divisionQuantity) =>
  Math.abs(maxPointValue - minPointValue) / divisionQuantity;

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
  markProperties,
  markstep,
  divisionQuantity,
  minPointValue,
  stepValue,
  markDigits,
  formatMark = (mark) => mark,
  disabled,
  styles
) => {
  const marks = {};
  if (markProperties.length > 0) {
    markProperties.forEach((markProperty) => {
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
    });
  } else {
    const roundedMarkStep = Math.floor(markstep);
    for (let index = 0; index <= divisionQuantity; index += roundedMarkStep) {
      let labelValue = knobsPositionToScaledValue(index, minPointValue, stepValue).toFixed(
        markDigits
      );
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
export const createTrackStyles = (knobProperties, styles) => {
  const trackStyles = [];
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
export const createKnobStyles = (knobProperties, styles) => {
  const knobInner = [];
  const knobOuterStyle = [];

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
export const isSingleSlider = (values, defaultValues) => {
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
  knobPropertiesProp,
  numberOfKnobs = 1,
  disabled = false,
  theme
) => {
  let knobProperties = knobPropertiesProp || [];
  const defaultKnobStyles = {
    color: theme.hv.palette.accent.acce1,
    hoverColor: theme.hv.palette.accent.acce1,
    trackColor: theme.hv.palette.accent.acce1,
    dragColor: theme.hv.palette.accent.acce1,
    knobRingColor: theme.hv.palette.atmosphere.atmo1,
  };

  const disabledKnobStyles = {
    color: theme.hv.palette.atmosphere.atmo5,
    hoverColor: theme.hv.palette.atmosphere.atmo5,
    trackColor: theme.hv.palette.atmosphere.atmo5,
    dragColor: theme.hv.palette.atmosphere.atmo5,
    knobRingColor: theme.hv.palette.atmosphere.atmo5,
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

const pushSlider = (index, inputIndex, inputValue) => {
  const difference = index - inputIndex;
  return inputValue + difference;
};

export const ensureValuesConsistency = (knobPositions, inputIndex) => {
  const newKnobsPosition = [...knobPositions];
  // const valueToTest = newKnobsPosition[index];
  newKnobsPosition.forEach((value, index) => {
    if (Number.isNaN(value) || value == null) {
      newKnobsPosition[index] = pushSlider(index, inputIndex, newKnobsPosition[inputIndex]);
    } else if (index < inputIndex && value > newKnobsPosition[inputIndex]) {
      newKnobsPosition[index] = pushSlider(index, inputIndex, newKnobsPosition[inputIndex]);
    } else if (index > inputIndex && value < newKnobsPosition[inputIndex]) {
      newKnobsPosition[index] = pushSlider(index, inputIndex, newKnobsPosition[inputIndex]);
    }
  });
  return newKnobsPosition;
};

export const convertStatusToArray = (status, length) => {
  const result = {};
  result.arrayDefaultStatus = Array.from({ length }, () => validationStates.standBy);
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

export const statusArrayToFormStatus = (arrayStatus) => {
  const invalid = arrayStatus.some((status) => status === validationStates.invalid);
  if (invalid) return validationStates.invalid;
  const valid = arrayStatus.some((status) => status === validationStates.valid);
  if (valid) return validationStates.valid;
  return validationStates.standBy;
};

export const knobsValuesToString = (knobsValues, markDigits) =>
  knobsValues.map((knobValue) => (Number.isNaN(knobValue) ? "" : knobValue.toFixed(markDigits)));

export const stringValuesToKnobs = (inputsValues) =>
  inputsValues.map((inputValue) => parseFloat(inputValue));
